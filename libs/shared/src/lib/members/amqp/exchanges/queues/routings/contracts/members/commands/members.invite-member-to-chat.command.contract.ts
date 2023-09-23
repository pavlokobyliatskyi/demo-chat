import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsEmail, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MembersInviteMemberToChatCommandContract {
  export const exchange = {
    members: Exchanges.members,
  };

  export const routing = {
    inviteMemberToChatCommand: Routings.inviteMemberToChatCommand,
  };

  export const queue = {
    members: Queues.members,
  };

  export class Request {
    @IsString()
    chatId: string;

    @IsEmail()
    email: string;
  }

  export type Response = void;
}
