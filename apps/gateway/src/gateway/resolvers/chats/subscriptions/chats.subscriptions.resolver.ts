import { Resolver, Subscription } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { PUB_SUB } from '../../../../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { AccessTokenGuard } from '../../../guards';
import { ChatType } from '../../../types';
import { Users } from '@demo-chat/shared';

@Resolver()
export class ChatsSubscriptionsResolver {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  @UseGuards(AccessTokenGuard)
  @Subscription(() => ChatType, {
    filter: function (payload, _, context) {
      const user: Users.IUser = context.req.user;
      return payload.newChat.member._id === user._id;
    },
    resolve: function (payload) {
      return payload.newChat.chat;
    },
  })
  public async newChat() {
    return this.pubSub.asyncIterator('newChat');
  }
}
