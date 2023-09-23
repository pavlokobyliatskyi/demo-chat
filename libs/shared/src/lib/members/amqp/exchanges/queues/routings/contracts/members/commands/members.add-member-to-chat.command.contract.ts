import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MembersAddMemberToChatCommandContract {
  export const exchange = {
    members: Exchanges.members,
  };

  export const routing = {
    addMemberToChatCommand: Routings.addMemberToChatCommand,
  };

  export const queue = {
    members: Queues.members,
  };

  export class Request {
    @IsString()
    chatId: string;

    @IsString()
    userId: string;
  }

  export type Response = void;
}
