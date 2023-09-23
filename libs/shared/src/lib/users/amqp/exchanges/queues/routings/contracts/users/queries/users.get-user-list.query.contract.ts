import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IUser } from '../../../../../../../interfaces';
import { IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace UsersGetUserListQueryContract {
  export const exchange = {
    users: Exchanges.users,
  };

  export const routing = {
    getUserListQuery: Routings.getUserListQuery,
  };

  export const queue = {
    users: Queues.users,
  };

  export class Request {
    @IsString({ each: true })
    userIds: string[];
  }

  export class Response {
    users: Required<IUser>[];
  }
}
