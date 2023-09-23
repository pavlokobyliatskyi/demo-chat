import { Module } from '@nestjs/common';
import { MongooseInitModule } from '../mongoose-init/mongoose-init.module';
import { MessageRepository } from './repositories/message.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModel, MessageSchema } from './models/message.model';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [
    MongooseInitModule,
    MongooseModule.forFeature([
      {
        name: MessageModel.name,
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [MessageRepository, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
