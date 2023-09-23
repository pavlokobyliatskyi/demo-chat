import { Messages } from '@demo-chat/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'messages',
  timestamps: {
    createdAt: true,
  },
})
export class MessageModel extends Document implements Messages.IMessage {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
