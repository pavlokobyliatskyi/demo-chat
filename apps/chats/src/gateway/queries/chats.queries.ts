import { Controller, Inject, Logger } from '@nestjs/common';
import { ChatsService } from '../../chats/services/chats.service';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Chats } from '@demo-chat/shared';

@Controller()
export class ChatsQueries {
  private readonly logger = new Logger(ChatsQueries.name);

  constructor(
    @Inject(ChatsService) private readonly chatsService: ChatsService
  ) {}

  @RabbitRPC({
    exchange: Chats.ChatsGetChatListQueryContract.exchange.chats.name,
    routingKey:
      Chats.ChatsGetChatListQueryContract.routing.getChatListQuery.name,
    queue: Chats.ChatsGetChatListQueryContract.queue.chats.name,
    queueOptions: Chats.ChatsGetChatListQueryContract.queue.chats.options,
  })
  public async getChatList(
    @RabbitPayload() args: Chats.ChatsGetChatListQueryContract.Request
  ): Promise<Chats.ChatsGetChatListQueryContract.Response> {
    this.logger.log(`Get chat list ${JSON.stringify(args)}`);

    const chats = await this.chatsService.findByIds(args.chatIds);

    return {
      chats: chats.map((chat) => ({
        // TODO: Fix
        _id: chat._id as string,
        userId: chat.userId,
        tmc: chat.tmc,
      })),
    };
  }

  @RabbitRPC({
    exchange: Chats.ChatsGetChatQueryContract.exchange.chats.name,
    routingKey: Chats.ChatsGetChatQueryContract.routing.getChatQuery.name,
    queue: Chats.ChatsGetChatQueryContract.queue.chats.name,
    queueOptions: Chats.ChatsGetChatQueryContract.queue.chats.options,
  })
  public async getChat(
    @RabbitPayload() args: Chats.ChatsGetChatQueryContract.Request
  ): Promise<Chats.ChatsGetChatQueryContract.Response> {
    this.logger.log(`Get chat ${JSON.stringify(args)}`);

    const chat = await this.chatsService.findOne(args.chatId);

    return {
      chat: {
        _id: chat.id,
        userId: chat.userId,
        tmc: chat.tmc,
      },
    };
  }
}
