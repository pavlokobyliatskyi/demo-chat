import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChatType, MessageType, UserType } from '../../../types';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Messages } from '@demo-chat/shared';
import { MessagesGetMessagesInput } from './inputs/messages.get-messages.input';
import { AccessTokenGuard } from '../../../guards';
import { ChatsDataLoader, UsersDataLoader } from '../../../data-loaders';

@Resolver(() => MessageType)
export class MessagesQueriesResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(UsersDataLoader) private readonly usersDataLoader: UsersDataLoader,
    @Inject(ChatsDataLoader) private readonly chatsDataLoader: ChatsDataLoader
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [MessageType], { name: 'chatMessages' })
  public async getChatMessages(@Args('args') args: MessagesGetMessagesInput) {
    const { messages } =
      await this.amqpConnection.request<Messages.MessagesGetChatMessagesQueryContract.Response>(
        {
          exchange:
            Messages.MessagesGetChatMessagesQueryContract.exchange.messages
              .name,
          routingKey:
            Messages.MessagesGetChatMessagesQueryContract.routing
              .getChatMessagesQuery.name,
          payload: {
            chatId: args.chatId,
          } as Messages.MessagesGetChatMessagesQueryContract.Request,
        }
      );

    return messages;
  }

  @ResolveField(() => UserType, { name: 'user' })
  public async userId(
    @Parent() args: Omit<MessageType, 'user'> & { userId: string }
  ) {
    return await this.usersDataLoader.batchUsers.load(args.userId);
  }

  @ResolveField(() => ChatType, { name: 'chat' })
  public async chatId(
    @Parent() args: Omit<MessageType, 'chat'> & { chatId: string }
  ) {
    return await this.chatsDataLoader.batchChats.load(args.chatId);
  }
}
