import { Controller, Inject, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Messages } from '@demo-chat/shared';
import { MessagesService } from '../../messages/services/messages.service';

@Controller()
export class MessagesQueries {
  private readonly logger = new Logger(MessagesQueries.name);

  constructor(
    @Inject(MessagesService) private readonly messagesService: MessagesService
  ) {}

  @RabbitRPC({
    exchange:
      Messages.MessagesGetChatMessagesQueryContract.exchange.messages.name,
    routingKey:
      Messages.MessagesGetChatMessagesQueryContract.routing.getChatMessagesQuery
        .name,
    queue: Messages.MessagesGetChatMessagesQueryContract.queue.messages.name,
    queueOptions:
      Messages.MessagesGetChatMessagesQueryContract.queue.messages.options,
  })
  public async getChatMessages(
    @RabbitPayload() args: Messages.MessagesGetChatMessagesQueryContract.Request
  ): Promise<Messages.MessagesGetChatMessagesQueryContract.Response> {
    this.logger.log(`Get chat messages ${JSON.stringify(args)}`);

    // Get chat messages (last first)
    const chatMessages = await this.messagesService.findAsc(args.chatId);

    return {
      messages: chatMessages.map((message) => ({
        _id: message.id,
        chatId: message.chatId,
        userId: message.userId,
        text: message.text,
        createdAt: message.createdAt,
      })),
    };
  }

  @RabbitRPC({
    exchange:
      Messages.MessagesGetMessageListQueryContract.exchange.messages.name,
    routingKey:
      Messages.MessagesGetMessageListQueryContract.routing.getMessageListQuery
        .name,
    queue: Messages.MessagesGetMessageListQueryContract.queue.messages.name,
    queueOptions:
      Messages.MessagesGetMessageListQueryContract.queue.messages.options,
  })
  public async getMessageList(
    @RabbitPayload() args: Messages.MessagesGetMessageListQueryContract.Request
  ): Promise<Messages.MessagesGetMessageListQueryContract.Response> {
    this.logger.log(`Get message list ${JSON.stringify(args)}`);

    // Get messages (no sorted)
    const messages = await this.messagesService.findByIds(args.messageIds);

    return {
      messages: messages.map((message) => ({
        _id: message.id,
        chatId: message.chatId,
        userId: message.userId,
        text: message.text,
        createdAt: message.createdAt,
      })),
    };
  }
}
