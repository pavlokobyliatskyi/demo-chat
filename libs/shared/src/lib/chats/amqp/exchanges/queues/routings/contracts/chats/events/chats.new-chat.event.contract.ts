import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsNumber, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace ChatsNewChatEventContract {
  export const exchange = {
    chats: Exchanges.chats,
  };

  export const routing = {
    newChatEvent: Routings.newChatEvent,
  };

  export const queue = {
    members: Queues.members,
    search: Queues.search,
  };

  export class Request {
    @IsString()
    _id: string;

    @IsString()
    userId: string;

    @IsNumber()
    tmc: number;
  }

  export type Response = void;
}
