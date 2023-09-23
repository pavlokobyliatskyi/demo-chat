import { Members } from '@demo-chat/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'members' })
export class MemberModel extends Document implements Members.IMember {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  userId: string;
}

const MemberSchema = SchemaFactory.createForClass(MemberModel);

MemberSchema.index({ chatId: 1, userId: 1 }, { unique: true });

export { MemberSchema };
