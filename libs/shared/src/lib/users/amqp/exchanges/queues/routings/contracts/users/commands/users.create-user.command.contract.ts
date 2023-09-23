import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsString } from 'class-validator';
import { IUser } from '../../../../../../../interfaces';
import { Routings } from '../../../routings';

export namespace UsersCreateUserCommandContract {
  export const exchange = {
    users: Exchanges.users,
  };

  export const routing = {
    createUserCommand: Routings.createUserCommand,
  };

  export const queue = {
    users: Queues.users,
  };

  export class Request {
    @IsString()
    name: string;

    @IsString()
    email: string;
  }

  export class Response {
    user: Required<IUser>;
  }
}
