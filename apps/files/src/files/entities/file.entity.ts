import { Files } from '@demo-chat/shared';

export class FileEntity implements Files.IFile {
  id?: string;
  objectName: string; // path to the file in the bucket

  constructor(args: Files.IFile) {
    this.id = args.id;
    this.objectName = args.objectName;
  }
}
