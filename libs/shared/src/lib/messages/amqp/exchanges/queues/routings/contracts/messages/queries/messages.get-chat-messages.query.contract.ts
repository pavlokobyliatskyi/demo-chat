import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IMessage } from '../../../../../../../interfaces';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MessagesGetChatMessagesQueryContract {
  export const exchange = {
    messages: Exchanges.messages,
  };

  export const routing = {
    getChatMessagesQuery: Routings.getChatMessagesQuery,
  };

  export const queue = {
    messages: Queues.messages,
  };

  export class Request {
    @IsString()
    chatId: string;
  }

  export class Response {
    messages: Required<IMessage>[];
  }
}
