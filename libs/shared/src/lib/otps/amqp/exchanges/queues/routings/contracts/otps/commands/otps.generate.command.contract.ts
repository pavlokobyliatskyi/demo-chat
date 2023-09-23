import { IsString } from 'class-validator';
import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { Routings } from '../../../routings';

export namespace OtpsGenerateCommandContract {
  export const exchange = {
    otps: Exchanges.otps,
  };

  export const routing = {
    generate: Routings.generateCommand,
  };

  export const queue = {
    otps: Queues.otps,
  };

  export class Request {
    @IsString()
    key: string;
  }

  export class Response {
    code: string;
  }
}
