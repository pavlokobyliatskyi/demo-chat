import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { Chats } from '@demo-chat/shared';
import { ChatEntity } from '../entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @Inject(ChatRepository) private readonly chatRepository: ChatRepository
  ) {}

  public async create(args: Omit<Chats.IChat, 'tmc'>) {
    const chatEntity = new ChatEntity({
      userId: args.userId,
    });
    return await this.chatRepository.create(chatEntity);
  }

  public async incrementTmc(chatId: string) {
    return await this.chatRepository.increment({ _id: chatId });
  }

  public async findByIds(ids: string[]) {
    return await this.chatRepository.findByIds(ids, 100);
  }

  public async findOne(_id: string) {
    return await this.chatRepository.findOne({ _id });
  }
}
