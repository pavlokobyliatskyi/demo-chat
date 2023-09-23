import { Chats } from '@demo-chat/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'chats' })
export class ChatModel extends Document implements Chats.IChat {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, default: 0 })
  tmc: number;
}

export const ChatSchema = SchemaFactory.createForClass(ChatModel);
