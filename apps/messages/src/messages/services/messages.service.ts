import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';
import { Messages } from '@demo-chat/shared';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MessageRepository)
    private readonly messageRepository: MessageRepository
  ) {}

  public async create(args: Omit<Messages.IMessage, 'createdAt'>) {
    const messageEntity = new MessageEntity({
      chatId: args.chatId,
      userId: args.userId,
      text: args.text,
    });

    return await this.messageRepository.create(messageEntity);
  }

  public async findAsc(chatId: string, limit = 100) {
    return await this.messageRepository.findAsc({ chatId }, limit);
  }

  public async findByIds(ids: string[]) {
    return await this.messageRepository.findByIds(ids, 100);
  }
}
