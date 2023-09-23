import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MembersGetUserChatsQueryContract {
  export const exchange = {
    members: Exchanges.members,
  };

  export const routing = {
    getUserChatsQuery: Routings.getUserChatsQuery,
  };

  export const queue = {
    members: Queues.members,
  };

  export class Request {
    @IsString()
    userId: string;
  }

  export class Response {
    chatIds: string[];
  }
}
