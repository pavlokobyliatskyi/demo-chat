import { Controller, Inject, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Members } from '@demo-chat/shared';
import { ChatsService } from '../../chats/services/chats.service';

@Controller()
export class MembersEvents {
  private readonly logger = new Logger(MembersEvents.name);

  constructor(
    @Inject(ChatsService) private readonly chatsService: ChatsService
  ) {}

  @RabbitRPC({
    exchange: Members.MembersNewMemberEventContract.exchange.members.name,
    routingKey:
      Members.MembersNewMemberEventContract.routing.newMemberEvent.name,
    queue: Members.MembersNewMemberEventContract.queue.chats.name,
    queueOptions: Members.MembersNewMemberEventContract.queue.chats.options,
  })
  public async newMember(
    @RabbitPayload() args: Members.MembersNewMemberEventContract.Request
  ): Promise<Members.MembersNewMemberEventContract.Response> {
    this.logger.log(`Increment tmc ${JSON.stringify(args)}`);

    // Add +1 to tmc
    await this.chatsService.incrementTmc(args.chatId);
  }
}
