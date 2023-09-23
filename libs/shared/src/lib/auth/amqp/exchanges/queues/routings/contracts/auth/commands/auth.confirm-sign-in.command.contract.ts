import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsEmail, IsString, Length } from 'class-validator';
import { Routings } from '../../../routings';

export namespace AuthConfirmSignInCommandContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    confirmSignInCommand: Routings.confirmSignInCommand,
  };

  export const queue = {
    auth: Queues.auth,
  };

  export class Request {
    @IsEmail()
    email: string;

    @Length(6, 6)
    @IsString()
    code: string;
  }

  export class Response {
    accessToken: string;
    refreshToken: string;
  }
}
