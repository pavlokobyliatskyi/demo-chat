import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLVoid } from 'graphql-scalars';
import { MembersInviteMemberInput } from './inputs/members.invite-member.input';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Members } from '@demo-chat/shared';
import { AccessTokenGuard } from '../../../guards';

@Resolver()
export class MembersMutationsResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Mutation(() => GraphQLVoid, {
    nullable: true,
    name: 'inviteMember',
    description: 'Invite the user to become a member of the chat.',
  })
  public async inviteMember(@Args('args') args: MembersInviteMemberInput) {
    await this.amqpConnection.request<Members.MembersInviteMemberToChatCommandContract.Response>(
      {
        exchange:
          Members.MembersInviteMemberToChatCommandContract.exchange.members
            .name,
        routingKey:
          Members.MembersInviteMemberToChatCommandContract.routing
            .inviteMemberToChatCommand.name,
        payload: {
          chatId: args.chatId,
          email: args.email,
        } as Members.MembersInviteMemberToChatCommandContract.Request,
      }
    );

    return;
  }
}
