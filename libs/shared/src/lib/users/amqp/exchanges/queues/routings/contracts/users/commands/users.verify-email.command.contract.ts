import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace UsersVerifyEmailCommandContract {
  export const exchange = {
    users: Exchanges.users,
  };

  export const routing = {
    verifyEmailCommand: Routings.verifyEmailCommand,
  };

  export const queue = {
    users: Queues.users,
  };

  export class Request {
    @IsString()
    email: string;
  }

  export type Response = boolean;
}
