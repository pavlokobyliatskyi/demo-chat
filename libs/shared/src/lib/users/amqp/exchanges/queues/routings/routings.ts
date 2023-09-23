import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly createUserCommand: IRouting = {
    name: `${Exchanges.users.name}.create-user.command.routing`,
  };

  public static readonly verifyEmailCommand: IRouting = {
    name: `${Exchanges.users.name}.verify-email.command.routing`,
  };

  public static readonly getEmailInfoQuery: IRouting = {
    name: `${Exchanges.users.name}.get-email-info.query.routing`,
  };

  public static readonly getUserQuery: IRouting = {
    name: `${Exchanges.users.name}.get-user.query.routing`,
  };

  public static readonly getUserListQuery: IRouting = {
    name: `${Exchanges.users.name}.get-user-list.query.routing`,
  };

  public static readonly changeInfoCommand: IRouting = {
    name: `${Exchanges.users.name}.change-info.command.routing`,
  };
}
