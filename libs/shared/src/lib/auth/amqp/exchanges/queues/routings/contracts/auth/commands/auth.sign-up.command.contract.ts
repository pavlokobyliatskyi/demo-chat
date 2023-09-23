import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsEmail, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace AuthSignUpCommandContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    signUpCommand: Routings.signUpCommand,
  };

  export const queue = {
    auth: Queues.auth,
  };

  export class Request {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
  }

  export type Response = void;
}
