import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { FileModel } from '../models/file.model';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(FileModel)
    private readonly fileRepository: Repository<FileModel>
  ) {}

  public async create(args: FileEntity) {
    return await this.fileRepository.save(args);
  }

  public async findOne(id: string) {
    return await this.fileRepository.findOneBy({ id });
  }
}
