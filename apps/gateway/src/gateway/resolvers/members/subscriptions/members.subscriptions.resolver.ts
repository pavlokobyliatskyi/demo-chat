import { Resolver, Subscription } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { PUB_SUB } from '../../../../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AccessTokenGuard } from '../../../guards';
import { UserType } from '../../../types';
import { Members, Users } from '@demo-chat/shared';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Resolver()
export class MembersSubscriptionsResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Subscription(() => UserType, {
    filter: async function (
      this: MembersSubscriptionsResolver,
      payload,
      _,
      context
    ) {
      const user: Users.IUser = context.req.user;

      const { userIds } =
        await this.amqpConnection.request<Members.MembersGetChatMembersQueryContract.Response>(
          {
            exchange:
              Members.MembersGetChatMembersQueryContract.exchange.members.name,
            routingKey:
              Members.MembersGetChatMembersQueryContract.routing
                .getChatMembersQuery.name,
            payload: {
              chatId: payload.newMember.chat._id,
            } as Members.MembersGetChatMembersQueryContract.Request,
          }
        );

      return userIds.includes(user._id);
    },
    resolve: function (payload) {
      return payload.newMember.member;
    },
  })
  public async newMember() {
    return this.pubSub.asyncIterator('newMember');
  }
}
