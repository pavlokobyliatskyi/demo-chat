import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly generateCommand: IRouting = {
    name: `${Exchanges.otps.name}.generate.command.routing`,
  };

  public static readonly verifyCommand: IRouting = {
    name: `${Exchanges.otps.name}.verify.command.routing`,
  };
}
