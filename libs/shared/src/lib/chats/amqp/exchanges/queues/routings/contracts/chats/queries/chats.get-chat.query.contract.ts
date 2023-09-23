import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IChat } from '../../../../../../../intefaces';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace ChatsGetChatQueryContract {
  export const exchange = {
    chats: Exchanges.chats,
  };

  export const routing = {
    getChatQuery: Routings.getChatQuery,
  };

  export const queue = {
    chats: Queues.chats,
  };

  export class Request {
    @IsString()
    chatId: string;
  }

  export class Response {
    chat: Required<IChat>;
  }
}
