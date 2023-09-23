import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { IMessage } from '../../../../../../../interfaces';
import { Routings } from '../../../routings';

export namespace MessagesSendMessageCommandContract {
  export const exchange = {
    messages: Exchanges.messages,
  };

  export const routing = {
    sendMessageCommand: Routings.sendMessageCommand,
  };

  export const queue = {
    messages: Queues.messages,
  };

  export class Request {
    @IsString()
    chatId: string;

    @IsString()
    userId: string;

    @IsString()
    text: string;
  }

  export class Response {
    message: Required<IMessage>;
  }
}
