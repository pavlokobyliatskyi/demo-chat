import { IsString, Length } from 'class-validator';
import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { Routings } from '../../../routings';

export namespace OtpsVerifyCommandContract {
  export const exchange = {
    otps: Exchanges.otps,
  };

  export const routing = {
    verify: Routings.verifyCommand,
  };

  export const queue = {
    otps: Queues.otps,
  };

  export class Request {
    @IsString()
    key: string;

    @Length(6, 6)
    @IsString()
    code: string;
  }

  export type Response = boolean;
}
