import { Controller, Inject } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { MessagesIndexService } from '../../index/services/messages-index.service';
import { Members, Messages, Search } from '@demo-chat/shared';

@Controller()
export class MessagesQueries {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(MessagesIndexService)
    private readonly messagesIndex: MessagesIndexService
  ) {}

  @RabbitRPC({
    exchange: Search.SearchMessagesSearchQueryContract.exchange.search.name,
    routingKey:
      Search.SearchMessagesSearchQueryContract.routing.messagesSearchQuery.name,
    queue: Search.SearchMessagesSearchQueryContract.queue.search.name,
    queueOptions: Search.SearchMessagesSearchQueryContract.queue.search.options,
  })
  public async search(
    @RabbitPayload() args: Search.SearchMessagesSearchQueryContract.Request
  ): Promise<Search.SearchMessagesSearchQueryContract.Response> {
    // Get user chats
    const { chatIds } =
      await this.amqpConnection.request<Members.MembersGetUserChatsQueryContract.Response>(
        {
          exchange:
            Members.MembersGetUserChatsQueryContract.exchange.members.name,
          routingKey:
            Members.MembersGetUserChatsQueryContract.routing.getUserChatsQuery
              .name,
          payload: {
            userId: args.userId,
          } as Members.MembersGetUserChatsQueryContract.Request,
        }
      );

    const messages: Omit<Messages.IMessage, 'userId'>[] = [];

    // Search in these chats
    for (const chatId of chatIds) {
      const results = await this.messagesIndex.search(chatId, args.query);

      if (!results.length) {
        continue;
      }

      messages.push(...results);
    }

    // Sort messages by createdAt (new first)
    messages.sort(
      (a, b) =>
        new Date(Number(b.createdAt)).getTime() -
        new Date(Number(a.createdAt)).getTime()
    );

    return { messageIds: messages.map(({ _id }) => _id) };
  }
}
