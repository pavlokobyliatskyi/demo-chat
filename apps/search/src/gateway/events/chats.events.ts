import { Controller, Inject, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Chats } from '@demo-chat/shared';
import { MessagesIndexService } from '../../index/services/messages-index.service';

@Controller()
export class ChatsEvents {
  private readonly logger = new Logger(ChatsEvents.name);

  constructor(
    @Inject(MessagesIndexService)
    private readonly messagesIndexService: MessagesIndexService
  ) {}

  @RabbitRPC({
    exchange: Chats.ChatsNewChatEventContract.exchange.chats.name,
    routingKey: Chats.ChatsNewChatEventContract.routing.newChatEvent.name,
    queue: Chats.ChatsNewChatEventContract.queue.search.name,
    queueOptions: Chats.ChatsNewChatEventContract.queue.search.options,
  })
  public async newChat(
    @RabbitPayload() args: Chats.ChatsNewChatEventContract.Request
  ): Promise<Chats.ChatsNewChatEventContract.Response> {
    this.logger.log(`Create an index for a new chat ${JSON.stringify(args)}`);

    await this.messagesIndexService.createIndex(args._id);
  }
}
