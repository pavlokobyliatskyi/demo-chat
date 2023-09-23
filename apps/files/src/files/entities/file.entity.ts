import { Files } from '@demo-chat/shared';

export class FileEntity implements Files.IFile {
  id?: string;
  objectName: string; // file path in bucket

  constructor(args: Files.IFile) {
    this.id = args.id;
    this.objectName = args.objectName;
  }

  public getFilePath() {
    return '/some/file/path';
  }
}
