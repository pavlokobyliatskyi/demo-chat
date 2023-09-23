import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsEmail } from 'class-validator';
import { IUser } from '../../../../../../../interfaces';
import { Routings } from '../../../routings';

export namespace UsersGetEmailInfoQueryContract {
  export const exchange = {
    users: Exchanges.users,
  };

  export const routing = {
    getEmailInfoQuery: Routings.getEmailInfoQuery,
  };

  export const queue = {
    users: Queues.users,
  };

  export class Request {
    @IsEmail()
    email: string;
  }

  export class Response {
    user: Required<IUser> | null;
  }
}
