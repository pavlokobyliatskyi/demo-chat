import {
  BadRequestException,
  Controller,
  Inject,
  Logger,
} from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { MembersService } from '../../members/services/members.service';
import { Members, Users } from '@demo-chat/shared';

@Controller()
export class MembersCommands {
  private readonly logger = new Logger(MembersCommands.name);

  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(MembersService) private readonly membersService: MembersService
  ) {}

  @RabbitRPC({
    exchange:
      Members.MembersAddMemberToChatCommandContract.exchange.members.name,
    routingKey:
      Members.MembersAddMemberToChatCommandContract.routing
        .addMemberToChatCommand.name,
    queue: Members.MembersAddMemberToChatCommandContract.queue.members.name,
    queueOptions:
      Members.MembersAddMemberToChatCommandContract.queue.members.options,
  })
  public async addMemberToChat(
    @RabbitPayload() args: Members.MembersAddMemberToChatCommandContract.Request
  ): Promise<Members.MembersAddMemberToChatCommandContract.Response> {
    this.logger.log(`Add a member to an existing chat ${JSON.stringify(args)}`);

    // Add member
    const newMember = await this.membersService.create({
      chatId: args.chatId,
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

  @RabbitRPC({
    exchange:
      Members.MembersInviteMemberToChatCommandContract.exchange.members.name,
    routingKey:
      Members.MembersInviteMemberToChatCommandContract.routing
        .inviteMemberToChatCommand.name,
    queue: Members.MembersInviteMemberToChatCommandContract.queue.members.name,
    queueOptions:
      Members.MembersInviteMemberToChatCommandContract.queue.members.options,
  })
  public async inviteMemberToChat(
    @RabbitPayload()
    args: Members.MembersInviteMemberToChatCommandContract.Request
  ): Promise<Members.MembersInviteMemberToChatCommandContract.Response> {
    this.logger.log(
      `Fake invite a member to an existing chat ${JSON.stringify(args)}`
    );

    // Get email info
    const { user: member } =
      await this.amqpConnection.request<Users.UsersGetEmailInfoQueryContract.Response>(
        {
          exchange: Users.UsersGetEmailInfoQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetEmailInfoQueryContract.routing.getEmailInfoQuery.name,
          payload: {
            email: args.email,
          } as Users.UsersGetEmailInfoQueryContract.Request,
        }
      );

    if (!member) {
      throw new BadRequestException(
        'The user with this address does not exist.'
      );
    }

    // Add member
    const newMember = await this.membersService.create({
      chatId: args.chatId,
      userId: member._id,
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
