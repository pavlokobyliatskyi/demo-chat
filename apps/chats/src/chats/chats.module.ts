import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseInitModule } from '../mongoose-init/mongoose-init.module';
import { ChatModel, ChatSchema } from './models/chat.model';
import { ChatRepository } from './repositories/chat.repository';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [
    MongooseInitModule,
    MongooseModule.forFeature([
      {
        name: ChatModel.name,
        schema: ChatSchema,
      },
    ]),
  ],
  providers: [ChatRepository, ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
