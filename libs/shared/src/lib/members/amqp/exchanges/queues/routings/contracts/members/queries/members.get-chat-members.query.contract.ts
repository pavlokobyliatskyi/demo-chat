import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MembersGetChatMembersQueryContract {
  export const exchange = {
    members: Exchanges.members,
  };

  export const routing = {
    getChatMembersQuery: Routings.getChatMembersQuery,
  };

  export const queue = {
    members: Queues.members,
  };

  export class Request {
    @IsString({ each: true })
    chatId: string;
  }

  export class Response {
    userIds: string[];
  }
}
