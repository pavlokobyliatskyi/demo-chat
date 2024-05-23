import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Chats } from '@demo-chat/shared';
import { Document } from 'mongoose';

@Schema({ collection: 'chats' })
export class ChatModel extends Document implements Chats.IChat { 
  // TODO: Fix
  // Explicitly define the _id property with the correct type
  _id: string;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, default: 0 })
  tmc: number;

  
}

export const ChatSchema = SchemaFactory.createForClass(ChatModel);
