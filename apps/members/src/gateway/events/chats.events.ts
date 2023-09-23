import { Controller, Inject, Logger } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Chats, Members } from '@demo-chat/shared';
import { MembersService } from '../../members/services/members.service';

@Controller()
export class ChatsEvents {
  private readonly logger = new Logger(ChatsEvents.name);

  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(MembersService) private readonly membersService: MembersService
  ) {}

  @RabbitRPC({
    exchange: Chats.ChatsNewChatEventContract.exchange.chats.name,
    routingKey: Chats.ChatsNewChatEventContract.routing.newChatEvent.name,
    queue: Chats.ChatsNewChatEventContract.queue.members.name,
    queueOptions: Chats.ChatsNewChatEventContract.queue.members.options,
  })
  public async newChat(
    @RabbitPayload() args: Chats.ChatsNewChatEventContract.Request
  ): Promise<Chats.ChatsNewChatEventContract.Response> {
    this.logger.log(
      `Add the owner as a member to a new chat ${JSON.stringify(args)}`
    );

    // Add chat owner as member
    const newMember = await this.membersService.create({
      chatId: args._id,
      userId: args.userId,
    });

    // Publish new member event
    await this.amqpConnection.publish<Members.MembersNewMemberEventContract.Request>(
      Members.MembersNewMemberEventContract.exchange.members.name,
      Members.MembersNewMemberEventContract.routing.newMemberEvent.name,
      {
        _id: newMember._id,
        chatId: newMember.chatId,
        userId: newMember.userId,
      }
    );
  }
}
