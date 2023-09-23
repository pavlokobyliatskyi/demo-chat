import { Files } from '@demo-chat/shared';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FileModel extends BaseEntity implements Files.IFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'object_name' })
  objectName: string;
}
