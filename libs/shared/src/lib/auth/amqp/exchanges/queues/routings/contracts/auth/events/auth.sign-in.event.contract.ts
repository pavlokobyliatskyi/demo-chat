import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace AuthSignInEventContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    signInEvent: Routings.signInEvent,
  };

  export const queue = {
    emails: Queues.emails,
  };

  export class Request {
    @IsString()
    _id: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsBoolean()
    isEmailVerified: boolean;
  }

  export type Response = void;
}
