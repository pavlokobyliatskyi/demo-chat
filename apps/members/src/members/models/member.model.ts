import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Members } from '@demo-chat/shared';

@Schema({ collection: 'members' })
export class MemberModel extends Document implements Members.IMember {
   // TODO: Fix
  // Explicitly define the _id property with the correct type
  _id: string;

  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  userId: string;
}

const MemberSchema = SchemaFactory.createForClass(MemberModel);

MemberSchema.index({ chatId: 1, userId: 1 }, { unique: true });

export { MemberSchema };
