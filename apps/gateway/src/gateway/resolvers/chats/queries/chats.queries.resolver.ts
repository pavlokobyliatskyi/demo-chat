import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChatType, MessageType, UserType } from '../../../types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, UseGuards } from '@nestjs/common';
import { Chats, Members, Users } from '@demo-chat/shared';
import { User } from '../../../decorators';
import { AccessTokenGuard } from '../../../guards';
import { UsersDataLoader } from '../../../data-loaders';

@Resolver(() => ChatType)
export class ChatsQueriesResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(UsersDataLoader) private readonly usersDataLoader: UsersDataLoader
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [ChatType], { name: 'chats' })
  public async chats(@User() user: Users.IUser) {
    const { chatIds } =
      await this.amqpConnection.request<Members.MembersGetUserChatsQueryContract.Response>(
        {
          exchange:
            Members.MembersGetUserChatsQueryContract.exchange.members.name,
          routingKey:
            Members.MembersGetUserChatsQueryContract.routing.getUserChatsQuery
              .name,
          payload: {
            userId: user._id,
          } as Members.MembersGetUserChatsQueryContract.Request,
        }
      );

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

    return chats;
  }

  @ResolveField(() => UserType, { name: 'user' })
  public async userId(
    @Parent() args: Omit<MessageType, 'user'> & { userId: string }
  ) {
    return await this.usersDataLoader.batchUsers.load(args.userId);
  }
}
