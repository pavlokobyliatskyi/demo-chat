import { Controller, Inject, Logger } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Chats, Members, Users } from '@demo-chat/shared';
import { PUB_SUB } from '../../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Controller()
export class MembersEvents {
  private readonly logger = new Logger(MembersEvents.name);

  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC({
    exchange: Members.MembersNewMemberEventContract.exchange.members.name,
    routingKey:
      Members.MembersNewMemberEventContract.routing.newMemberEvent.name,
    queue: Members.MembersNewMemberEventContract.queue.gateway.name,
    queueOptions: Members.MembersNewMemberEventContract.queue.gateway.options,
  })
  public async newMember(
    @RabbitPayload() args: Members.MembersNewMemberEventContract.Request
  ): Promise<Members.MembersNewMemberEventContract.Response> {
    this.logger.log(
      `Publish new member to subscribers ${JSON.stringify(args)}`
    );

    const { chat } =
      await this.amqpConnection.request<Chats.ChatsGetChatQueryContract.Response>(
        {
          exchange: Chats.ChatsGetChatQueryContract.exchange.chats.name,
          routingKey: Chats.ChatsGetChatQueryContract.routing.getChatQuery.name,
          payload: {
            chatId: args.chatId,
          } as Chats.ChatsGetChatQueryContract.Request,
        }
      );

    const { user } =
      await this.amqpConnection.request<Users.UsersGetUserQueryContract.Response>(
        {
          exchange: Users.UsersGetUserQueryContract.exchange.users.name,
          routingKey: Users.UsersGetUserQueryContract.routing.getUserQuery.name,
          payload: {
            _id: args.userId,
          } as Users.UsersGetUserQueryContract.Request,
        }
      );

    await Promise.all([
      this.pubSub.publish('newMember', {
        newMember: {
          member: user,
          chat,
        },
      }),
      this.pubSub.publish('newChat', {
        newChat: {
          chat,
          member: user,
        },
      }),
    ]);
  }
}
