import { Inject, Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Chats } from '@demo-chat/shared';

@Injectable({ scope: Scope.REQUEST })
export class ChatsDataLoader {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  public readonly batchChats = new DataLoader(async (chatIds: string[]) => {
    const { chats } =
      await this.amqpConnection.request<Chats.ChatsGetChatListQueryContract.Response>(
        {
          exchange: Chats.ChatsGetChatListQueryContract.exchange.chats.name,
          routingKey:
            Chats.ChatsGetChatListQueryContract.routing.getChatListQuery.name,
          payload: {
            chatIds,
          } as Chats.ChatsGetChatListQueryContract.Request,
        }
      );

    const chatsMap = new Map(chats.map((chat) => [chat._id, chat]));

    return chatIds.map((chatId) => chatsMap.get(chatId));
  });
}
