import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { Routings } from '../../../routings';
import { IsString } from 'class-validator';

export namespace MembersNewMemberEventContract {
  export const exchange = {
    members: Exchanges.members,
  };

  export const routing = {
    newMemberEvent: Routings.newMemberEvent,
  };

  export const queue = {
    gateway: Queues.gateway,
    chats: Queues.chats,
  };

  export class Request {
    @IsString()
    _id: string;

    @IsString()
    chatId: string;

    @IsString()
    userId: string;
  }

  export type Response = void;
}
