export interface IUser {
  _id?: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  pictureFileId?: string | null;
}
