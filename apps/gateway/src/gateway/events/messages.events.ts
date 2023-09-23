import { Controller, Inject, Logger } from '@nestjs/common';
import { PUB_SUB } from '../../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Messages } from '@demo-chat/shared';

@Controller()
export class MessagesEvents {
  private readonly logger = new Logger(MessagesEvents.name);

  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  @RabbitRPC({
    exchange: Messages.MessagesNewMessageEventContract.exchange.messages.name,
    routingKey:
      Messages.MessagesNewMessageEventContract.routing.newMessageEvent.name,
    queue: Messages.MessagesNewMessageEventContract.queue.gateway.name,
    queueOptions:
      Messages.MessagesNewMessageEventContract.queue.gateway.options,
  })
  public async newMessage(
    @RabbitPayload() args: Messages.MessagesNewMessageEventContract.Request
  ): Promise<Messages.MessagesNewMessageEventContract.Response> {
    this.logger.log(
      `Publish new message to subscribers ${JSON.stringify(args)}`
    );

    await this.pubSub.publish('newMessage', {
      newMessage: args,
    });
  }
}
