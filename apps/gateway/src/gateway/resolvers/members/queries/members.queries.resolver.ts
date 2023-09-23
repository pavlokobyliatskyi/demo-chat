import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from '../../../types';
import { MembersGetChatMembersInput } from './inputs/members.get-chat-members.input';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AccessTokenGuard } from '../../../guards';
import { Members, Users } from '@demo-chat/shared';

@Resolver()
export class MembersQueriesResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [UserType], { name: 'chatMembers' })
  public async chatMembers(@Args('args') args: MembersGetChatMembersInput) {
    const { userIds } =
      await this.amqpConnection.request<Members.MembersGetChatMembersQueryContract.Response>(
        {
          exchange:
            Members.MembersGetChatMembersQueryContract.exchange.members.name,
          routingKey:
            Members.MembersGetChatMembersQueryContract.routing
              .getChatMembersQuery.name,
          payload: {
            chatId: args.chatId,
          } as Members.MembersGetChatMembersQueryContract.Request,
        }
      );

    const { users } =
      await this.amqpConnection.request<Users.UsersGetUserListQueryContract.Response>(
        {
          exchange: Users.UsersGetUserListQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetUserListQueryContract.routing.getUserListQuery.name,
          payload: {
            userIds,
          } as Users.UsersGetUserListQueryContract.Request,
        }
      );

    return users;
  }
}
