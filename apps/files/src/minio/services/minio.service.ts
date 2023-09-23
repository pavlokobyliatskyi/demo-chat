import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Minio from 'minio';
import { BucketItemFromList, BucketItemStat, PostPolicyResult } from 'minio';
import { ConfigService } from '../../config/services/config.service';

@Injectable()
export class MinioService {
  private readonly logger = new Logger();

  private readonly minioClient: Minio.Client;
  private readonly minioHost: string;
  private readonly minioPort: number;
  private readonly bucket: string;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
    this.minioHost = this.configService.minio.getHost();
    this.minioPort = this.configService.minio.getPort();

    this.minioClient = new Minio.Client({
      endPoint: this.minioHost,
      port: this.minioPort,
      useSSL: false,
      accessKey: this.configService.minio.getUser(),
      secretKey: this.configService.minio.getPassword(),
    });

    this.bucket = this.configService.minio.getDefaultBucket();
  }

  public async makeBucket(): Promise<boolean> {
    // Check if buket already exist
    const buckets = await this.listBuckets();

    if (buckets.find((bucket) => bucket.name === this.bucket)) {
      return true;
    }

    return new Promise((resolve, reject) => {
      this.minioClient.makeBucket(this.bucket, (e: Error) => {
        if (e) {
          this.logger.error(e.message);
          reject(e);
        }
        resolve(true);
      });
    });
  }

  public async listBuckets(): Promise<BucketItemFromList[]> {
    return new Promise((resolve, reject) => {
      this.minioClient
        .listBuckets()
        .then((buckets) => {
          resolve(buckets);
        })
        .catch((e) => {
          this.logger.error(e.message);
          reject(e);
        });
    });
  }

  public async presignedGetObject(objectName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.minioClient.presignedGetObject(
        this.bucket,
        objectName,
        1000,
        (e, presignedUrl) => {
          if (e) {
            this.logger.error(e.message);
            reject(e);
          }
          resolve(presignedUrl);
        }
      );
    });
  }

  public async presignedPutObject(objectName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.minioClient.presignedPutObject(
        this.bucket,
        objectName,
        1000,
        (e, presignedUrl) => {
          if (e) {
            this.logger.error(e.message);
            reject(e);
          }
          resolve(presignedUrl);
        }
      );
    });
  }

  public async presignedPostPolicy(
    objectName: string,
    contentType: string,
    contentLength: number
  ): Promise<PostPolicyResult> {
    return new Promise((resolve, reject) => {
      const policy = this.minioClient.newPostPolicy();

      policy.setBucket(this.bucket);
      policy.setKey(objectName);

      const expires = new Date();
      expires.setSeconds(1000);
      policy.setExpires(expires);

      policy.setContentType(contentType);
      policy.setContentDisposition('inline');
      policy.setContentLengthRange(contentLength, contentLength);

      this.minioClient.presignedPostPolicy(policy, (e, data) => {
        if (e) {
          this.logger.error(e.message);
          reject(e);
        }

        resolve(data);
      });
    });
  }

  public async putObject(
    objectName: string,
    mimetype: string,
    object: Buffer
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.minioClient.putObject(
        this.bucket,
        objectName,
        object,
        object.length,
        {
          'content-type': mimetype,
        },
        (e) => {
          if (e) {
            this.logger.error(e.message);
            reject(e);
          }
          resolve(true);
        }
      );
    });
  }

  public async getObject(objectName: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];

      this.minioClient.getObject(this.bucket, objectName, (e, dataStream) => {
        if (e) {
          reject(e);
        }
        dataStream.on('data', (chunk) => {
          chunks.push(chunk);
        });
        dataStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        dataStream.on('error', (e) => {
          this.logger.error(e.message);
          reject(e);
        });
      });
    });
  }

  public async statObject(objectName: string): Promise<BucketItemStat | null> {
    return new Promise((resolve) => {
      this.minioClient
        .statObject(this.bucket, objectName)
        .then((stat) => {
          resolve(stat);
        })
        .catch((e) => {
          this.logger.error(e.message);
          resolve(null);
        });
    });
  }
}
