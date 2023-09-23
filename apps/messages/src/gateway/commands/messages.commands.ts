import { Controller, Inject, Logger } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Messages } from '@demo-chat/shared';
import { MessagesService } from '../../messages/services/messages.service';

@Controller()
export class MessagesCommands {
  private readonly logger = new Logger(MessagesCommands.name);

  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(MessagesService) private readonly messagesService: MessagesService
  ) {}

  @RabbitRPC({
    exchange:
      Messages.MessagesSendMessageCommandContract.exchange.messages.name,
    routingKey:
      Messages.MessagesSendMessageCommandContract.routing.sendMessageCommand
        .name,
    queue: Messages.MessagesSendMessageCommandContract.queue.messages.name,
    queueOptions:
      Messages.MessagesSendMessageCommandContract.queue.messages.options,
  })
  public async sendMessage(
    @RabbitPayload() args: Messages.MessagesSendMessageCommandContract.Request
  ): Promise<Messages.MessagesSendMessageCommandContract.Response> {
    this.logger.log(`Send message ${JSON.stringify(args)}`);

    // Create message
    const newMessage = await this.messagesService.create({
      chatId: args.chatId,
      userId: args.userId,
      text: args.text,
    });

    // Publish new message event
    await this.amqpConnection.publish<Messages.MessagesNewMessageEventContract.Request>(
      Messages.MessagesNewMessageEventContract.exchange.messages.name,
      Messages.MessagesNewMessageEventContract.routing.newMessageEvent.name,
      {
        _id: newMessage._id,
        chatId: newMessage.chatId,
        userId: newMessage.userId,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
      }
    );

    return {
      message: {
        _id: newMessage._id,
        chatId: newMessage.chatId,
        userId: newMessage.userId,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
      },
    };
  }
}
