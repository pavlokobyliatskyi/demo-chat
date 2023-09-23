import { Module } from '@nestjs/common';
import { TypeormInitModule } from '../typeorm-init/typeorm-init.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModel } from './models/file.model';
import { FileRepository } from './repositories/file.repository';
import { FilesService } from './services/files.service';

@Module({
  imports: [TypeormInitModule, TypeOrmModule.forFeature([FileModel])],
  providers: [FileRepository, FilesService],
  exports: [FilesService],
})
export class FilesModule {}
