import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace AuthConfirmSignUpEventContract {
  export const exchange = {
    auth: Exchanges.auth,
  };

  export const routing = {
    confirmSignUpEvent: Routings.confirmSignUpEvent,
  };

  export const queue = {
    chats: Queues.chats,
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
