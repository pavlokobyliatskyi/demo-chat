import { Controller, Inject, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Messages } from '@demo-chat/shared';
import { MessagesIndexService } from '../../index/services/messages-index.service';

@Controller()
export class MessagesEvents {
  private readonly logger = new Logger(MessagesEvents.name);

  constructor(
    @Inject(MessagesIndexService)
    private readonly messagesIndex: MessagesIndexService
  ) {}

  @RabbitRPC({
    exchange: Messages.MessagesNewMessageEventContract.exchange.messages.name,
    routingKey:
      Messages.MessagesNewMessageEventContract.routing.newMessageEvent.name,
    queue: Messages.MessagesNewMessageEventContract.queue.search.name,
    queueOptions: Messages.MessagesNewMessageEventContract.queue.search.options,
  })
  public async newMessage(
    @RabbitPayload() args: Messages.MessagesNewMessageEventContract.Request
  ): Promise<Messages.MessagesNewMessageEventContract.Response> {
    this.logger.log(`Add message to index ${JSON.stringify(args)}`);

    // Add message to index
    await this.messagesIndex.addData(args.chatId, {
      _id: args._id,
      text: args.text,
      createdAt: args.createdAt,
    });
  }
}
