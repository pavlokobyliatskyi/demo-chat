import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace AuthRefreshTokenCommandContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    refreshTokenCommand: Routings.refreshTokenCommand,
  };

  export const queue = {
    auth: Queues.auth,
  };

  export class Request {
    @IsString()
    userId: string;
  }

  export class Response {
    accessToken: string;
  }
}
