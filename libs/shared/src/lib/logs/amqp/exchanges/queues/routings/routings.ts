import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly errorEvent: IRouting = {
    name: `${Exchanges.logs.name}.error.event.routing`,
  };

  public static readonly logEvent: IRouting = {
    name: `${Exchanges.logs.name}.log.event.routing`,
  };
}
