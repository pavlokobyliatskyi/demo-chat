import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsDateString, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace MessagesNewMessageEventContract {
  export const exchange = {
    messages: Exchanges.messages,
  };

  export const routing = {
    newMessageEvent: Routings.newMessageEvent,
  };

  export const queue = {
    gateway: Queues.gateway,
    search: Queues.search,
  };

  export class Request {
    @IsString()
    _id: string;

    @IsString()
    chatId: string;

    @IsString()
    userId: string;

    @IsString()
    text: string;

    @IsDateString()
    createdAt: Date;
  }

  export type Response = void;
}
