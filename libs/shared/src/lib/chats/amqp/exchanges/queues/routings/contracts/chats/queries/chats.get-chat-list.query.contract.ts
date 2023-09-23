import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IChat } from '../../../../../../../intefaces';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace ChatsGetChatListQueryContract {
  export const exchange = {
    chats: Exchanges.chats,
  };

  export const routing = {
    getChatListQuery: Routings.getChatListQuery,
  };

  export const queue = {
    chats: Queues.chats,
  };

  export class Request {
    @IsString({ each: true })
    chatIds: string[];
  }

  export class Response {
    chats: Required<IChat>[];
  }
}
