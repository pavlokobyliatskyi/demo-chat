import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly messagesSearchQuery: IRouting = {
    name: `${Exchanges.search.name}.messages-search.query.routing`,
  };
}
