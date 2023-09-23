import { Inject, Injectable } from '@nestjs/common';
import { FileRepository } from '../repositories/file.repository';
import { Files } from '@demo-chat/shared';
import { FileEntity } from '../entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @Inject(FileRepository) private readonly fileRepository: FileRepository
  ) {}

  public async create(args: Omit<Files.IFile, 'id'>) {
    const fileEntity = new FileEntity({
      objectName: args.objectName,
    });

    return await this.fileRepository.create(fileEntity);
  }

  public async findById(id: string) {
    return await this.fileRepository.findOne(id);
  }
}
