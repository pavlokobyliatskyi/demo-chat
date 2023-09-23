import { Controller, Inject, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { MembersService } from '../../members/services/members.service';
import { Members } from '@demo-chat/shared';

@Controller()
export class MembersQueries {
  private readonly logger = new Logger(MembersQueries.name);

  constructor(
    @Inject(MembersService) private readonly membersService: MembersService
  ) {}

  @RabbitRPC({
    exchange: Members.MembersGetChatMembersQueryContract.exchange.members.name,
    routingKey:
      Members.MembersGetChatMembersQueryContract.routing.getChatMembersQuery
        .name,
    queue: Members.MembersGetChatMembersQueryContract.queue.members.name,
    queueOptions:
      Members.MembersGetChatMembersQueryContract.queue.members.options,
  })
  public async getChatMembers(
    @RabbitPayload() args: Members.MembersGetChatMembersQueryContract.Request
  ): Promise<Members.MembersGetChatMembersQueryContract.Response> {
    this.logger.log(`Get chat members ${JSON.stringify(args)}`);

    const chatMembers = await this.membersService.findByChatId(args.chatId);

    return { userIds: chatMembers.map(({ userId }) => userId) };
  }

  @RabbitRPC({
    exchange: Members.MembersGetUserChatsQueryContract.exchange.members.name,
    routingKey:
      Members.MembersGetUserChatsQueryContract.routing.getUserChatsQuery.name,
    queue: Members.MembersGetUserChatsQueryContract.queue.members.name,
    queueOptions:
      Members.MembersGetUserChatsQueryContract.queue.members.options,
  })
  public async getUserChats(
    @RabbitPayload() args: Members.MembersGetUserChatsQueryContract.Request
  ): Promise<Members.MembersGetUserChatsQueryContract.Response> {
    this.logger.log(`Get user chats ${JSON.stringify(args)}`);

    const userChats = await this.membersService.findByUserId(args.userId);

    return { chatIds: userChats.map(({ chatId }) => chatId) };
  }
}
