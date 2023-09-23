import { Controller, Inject, Logger } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Auth, Chats } from '@demo-chat/shared';
import { ChatsService } from '../../chats/services/chats.service';

@Controller()
export class AuthEvents {
  private readonly logger = new Logger(AuthEvents.name);

  constructor(
    @Inject(ChatsService) private readonly chatsService: ChatsService,
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC({
    exchange: Auth.AuthConfirmSignUpEventContract.exchange.auth.name,
    routingKey:
      Auth.AuthConfirmSignUpEventContract.routing.confirmSignUpEvent.name,
    queue: Auth.AuthConfirmSignUpEventContract.queue.chats.name,
    queueOptions: Auth.AuthConfirmSignUpEventContract.queue.chats.options,
  })
  public async confirmSignUp(
    @RabbitPayload() args: Auth.AuthConfirmSignUpEventContract.Request
  ): Promise<Auth.AuthConfirmSignUpEventContract.Response> {
    this.logger.log(`Create a new chat ${JSON.stringify(args)}`);

    // Create new chat
    const newChat = await this.chatsService.create({
      userId: args._id,
    });

    // Publish new chat event
    await this.amqpConnection.publish<Chats.ChatsNewChatEventContract.Request>(
      Chats.ChatsNewChatEventContract.exchange.chats.name,
      Chats.ChatsNewChatEventContract.routing.newChatEvent.name,
      {
        _id: newChat._id,
        userId: newChat.userId,
        tmc: newChat.tmc,
      }
    );
  }
}
