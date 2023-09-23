import { BadRequestException, Controller, Inject } from '@nestjs/common';
import { Files } from '@demo-chat/shared';
import { FilesService } from '../../files/services/files.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { MinioService } from '../../minio/services/minio.service';
import { MineTypesService } from '../../mine-types/services/mine-types.service';

@Controller()
export class FilesQueries {
  constructor(
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(MinioService) private readonly minioService: MinioService,
    @Inject(MineTypesService)
    private readonly mineTypesService: MineTypesService
  ) {}

  @RabbitRPC({
    exchange:
      Files.FilesGetPresignedPostPolicyQueryContract.exchange.files.name,
    routingKey:
      Files.FilesGetPresignedPostPolicyQueryContract.routing
        .getPresignedPostPolicyQuery.name,
    queue: Files.FilesGetPresignedPostPolicyQueryContract.queue.files.name,
    queueOptions:
      Files.FilesGetPresignedPostPolicyQueryContract.queue.files.options,
  })
  public async getPresignedPostPolicy(
    args: Files.FilesGetPresignedPostPolicyQueryContract.Request
  ): Promise<Files.FilesGetPresignedPostPolicyQueryContract.Response> {
    // check file type
    const extension = await this.mineTypesService.extension(args.type);

    if (!extension) {
      throw new BadRequestException(`Invalid file type.`);
    }

    // Check filename type
    const lookup = await this.mineTypesService.lookup(args.name);

    if (!lookup) {
      throw new BadRequestException(`Invalid file format.`);
    }

    // Compare filename type and type
    if (lookup !== args.type) {
      throw new BadRequestException(`File format and type are not the same.`);
    }

    // Check file size
    if (args.size > 10436370) {
      throw new BadRequestException(`The file size should not exceed 10 mb.`);
    }

    // Create a filename
    const objectName = `${Date.now()}_${args.size}.${extension}`;

    // Save file path
    const file = await this.filesService.create({ objectName });

    // Create presigned post policy
    const presignedPostPolicy = await this.minioService.presignedPostPolicy(
      objectName,
      args.type,
      args.size
    );

    return {
      id: file.id,
      postUrl: presignedPostPolicy.postURL,
      formData: {
        bucket: presignedPostPolicy.formData['bucket'],
        key: presignedPostPolicy.formData['key'],
        contentType: presignedPostPolicy.formData['Content-Type'],
        contentDisposition: presignedPostPolicy.formData['Content-Disposition'],
        xAmzDate: presignedPostPolicy.formData['x-amz-date'],
        xAmzAlgorithm: presignedPostPolicy.formData['x-amz-algorithm'],
        xAmzCredential: presignedPostPolicy.formData['x-amz-credential'],
        policy: presignedPostPolicy.formData.policy,
        xAmzSignature: presignedPostPolicy.formData['x-amz-signature'],
      },
    };
  }

  @RabbitRPC({
    exchange: Files.FilesGetPresignedUrlQueryContract.exchange.files.name,
    routingKey:
      Files.FilesGetPresignedUrlQueryContract.routing.getPresignedUrlQuery.name,
    queue: Files.FilesGetPresignedUrlQueryContract.queue.files.name,
    queueOptions: Files.FilesGetPresignedUrlQueryContract.queue.files.options,
  })
  public async getPresignedUrl(
    args: Files.FilesGetPresignedUrlQueryContract.Request
  ): Promise<Files.FilesGetPresignedUrlQueryContract.Response> {
    // Check exist
    const file = await this.filesService.findById(args.id);

    if (!file) {
      return null;
    }

    // Check file stats
    const sobj = await this.minioService.statObject(file.objectName);

    if (!sobj) {
      return null;
    }

    // Return presigned URL
    return await this.minioService.presignedGetObject(file.objectName);
  }
}
