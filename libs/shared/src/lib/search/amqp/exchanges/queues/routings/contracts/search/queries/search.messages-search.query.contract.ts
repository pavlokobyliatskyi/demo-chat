import { IsString } from 'class-validator';
import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { Routings } from '../../../routings';

export namespace SearchMessagesSearchQueryContract {
  export const exchange = {
    search: Exchanges.search,
  };

  export const routing = {
    messagesSearchQuery: Routings.messagesSearchQuery,
  };

  export const queue = {
    search: Queues.search,
  };

  export class Request {
    @IsString()
    userId: string;

    @IsString()
    query: string;
  }

  export class Response {
    messageIds: string[];
  }
}
