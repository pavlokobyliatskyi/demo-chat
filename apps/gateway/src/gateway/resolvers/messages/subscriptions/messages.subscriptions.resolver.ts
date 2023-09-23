import { Resolver, Subscription } from '@nestjs/graphql';
import { PUB_SUB } from '../../../../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { MessageType } from '../../../types';
import { AccessTokenGuard } from '../../../guards';

@Resolver(() => MessageType)
export class MessagesSubscriptionsResolver {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  @UseGuards(AccessTokenGuard)
  @Subscription(() => MessageType, { nullable: true })
  public async newMessage() {
    return this.pubSub.asyncIterator('newMessage');
  }
}
