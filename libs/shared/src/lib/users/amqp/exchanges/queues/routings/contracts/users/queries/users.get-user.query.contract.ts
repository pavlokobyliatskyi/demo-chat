import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IUser } from '../../../../../../../interfaces';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace UsersGetUserQueryContract {
  export const exchange = {
    users: Exchanges.users,
  };

  export const routing = {
    getUserQuery: Routings.getUserQuery,
  };

  export const queue = {
    users: Queues.users,
  };

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    user: Required<IUser> | null;
  }
}
