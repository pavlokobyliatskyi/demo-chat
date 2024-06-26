import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Users } from '@demo-chat/shared';

@Schema({ collection: 'users' })
export class UserModel extends Document implements Users.IUser {
   // TODO: Fix
  // Explicitly define the _id property with the correct type
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: null })
  pictureFileId?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
