import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { MessageType } from '../../../types';
import { AccessTokenGuard } from '../../../guards';
import { User } from '../../../decorators';
import { MessagesSendMessageInput } from './inputs/messages.send-message.input';
import { Messages, Users } from '@demo-chat/shared';

@Resolver(() => MessageType)
export class MessagesMutationsResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Mutation(() => MessageType, { name: 'sendMessage' })
  public async sendMessage(
    @User() user: Users.IUser,
    @Args('args') args: MessagesSendMessageInput
  ) {
    const { message } =
      await this.amqpConnection.request<Messages.MessagesSendMessageCommandContract.Response>(
        {
          exchange:
            Messages.MessagesSendMessageCommandContract.exchange.messages.name,
          routingKey:
            Messages.MessagesSendMessageCommandContract.routing
              .sendMessageCommand.name,
          payload: {
            chatId: args.chatId,
            userId: user._id,
            text: args.text,
          } as Messages.MessagesSendMessageCommandContract.Request,
        }
      );

    return message;
  }
}
