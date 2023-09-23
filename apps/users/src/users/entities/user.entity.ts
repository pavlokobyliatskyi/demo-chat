import { Users } from '@demo-chat/shared';

export class UserEntity implements Users.IUser {
  _id?: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  pictureFileId?: string;

  constructor(args: Users.IUser) {
    this._id = args._id;
    this.name = args.name;
    this.email = args.email;
    this.isEmailVerified = args.isEmailVerified;
    this.pictureFileId = args.pictureFileId;
  }

  public verifyEmail() {
    this.isEmailVerified = true;
    return this;
  }

  public updateName(name: string) {
    this.name = name;
    return this;
  }

  public updatePicture(pictureFileId: string) {
    this.pictureFileId = pictureFileId;
    return this;
  }
}
