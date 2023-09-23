import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsEmail } from 'class-validator';
import { Routings } from '../../../routings';

export namespace AuthSignInCommandContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    signInCommand: Routings.signInCommand,
  };

  export const queue = {
    auth: Queues.auth,
  };

  export class Request {
    @IsEmail()
    email: string;
  }

  export type Response = void;
}
