import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly confirmSignInCommand: IRouting = {
    name: `${Exchanges.auth.name}.confirm-sign-in.command.routing`,
  };

  public static readonly confirmSignUpCommand: IRouting = {
    name: `${Exchanges.auth.name}.confirm-sign-up.command.routing`,
  };

  public static readonly refreshTokenCommand: IRouting = {
    name: `${Exchanges.auth.name}.refresh-token.command.routing`,
  };

  public static readonly signInCommand: IRouting = {
    name: `${Exchanges.auth.name}.sign-in.command.routing`,
  };

  public static readonly signUpCommand: IRouting = {
    name: `${Exchanges.auth.name}.sign-up.command.routing`,
  };

  public static readonly verifyAccessTokenCommand: IRouting = {
    name: `${Exchanges.auth.name}.verify-access-token.command.routing`,
  };

  public static readonly verifyRefreshTokenCommand: IRouting = {
    name: `${Exchanges.auth.name}.verify-refresh-token.command.routing`,
  };

  public static readonly confirmSignUpEvent: IRouting = {
    name: `${Exchanges.auth.name}.confirm-sign-up.event.routing`,
  };

  public static readonly signInEvent: IRouting = {
    name: `${Exchanges.auth.name}.sign-in.event.routing`,
  };

  public static readonly signUpEvent: IRouting = {
    name: `${Exchanges.auth.name}.sign-up.event.routing`,
  };
}
