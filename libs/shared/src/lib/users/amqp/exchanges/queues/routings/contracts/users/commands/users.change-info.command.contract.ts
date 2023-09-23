import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Routings } from '../../../routings';

export namespace UsersChangeInfoCommandContract {
  export const exchange = {
    users: Exchanges.users,
  };

  export const routing = {
    changeInfoCommand: Routings.changeInfoCommand,
  };

  export const queue = {
    users: Queues.users,
  };

  export class Request {
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsUUID('4')
    @IsString()
    pictureFileId?: string;
  }

  export type Response = boolean;
}
