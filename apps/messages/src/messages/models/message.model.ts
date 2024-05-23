import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Messages } from '@demo-chat/shared';

@Schema({
  collection: 'messages',
  timestamps: {
    createdAt: true,
  },
})
export class MessageModel extends Document implements Messages.IMessage {
   // TODO: Fix
  // Explicitly define the _id property with the correct type
  _id: string;

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
