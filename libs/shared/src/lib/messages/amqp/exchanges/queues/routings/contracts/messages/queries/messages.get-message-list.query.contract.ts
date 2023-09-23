import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IMessage } from '../../../../../../../interfaces';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MessagesGetMessageListQueryContract {
  export const exchange = {
    messages: Exchanges.messages,
  };

  export const routing = {
    getMessageListQuery: Routings.getMessageListQuery,
  };

  export const queue = {
    messages: Queues.messages,
  };

  export class Request {
    @IsString({ each: true })
    messageIds: string[];
  }

  export class Response {
    messages: Required<IMessage>[];
  }
}
