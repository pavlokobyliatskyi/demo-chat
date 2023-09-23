import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsJWT } from 'class-validator';
import { IUser } from '../../../../../../../../users';
import { Routings } from '../../../routings';

export namespace AuthVerifyRefreshTokenCommandContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    verifyRefreshTokenCommand: Routings.verifyRefreshTokenCommand,
  };

  export const queue = {
    auth: Queues.auth,
  };

  export class Request {
    @IsJWT()
    token: string;
  }

  export class Response {
    user: Required<IUser>;
  }
}
