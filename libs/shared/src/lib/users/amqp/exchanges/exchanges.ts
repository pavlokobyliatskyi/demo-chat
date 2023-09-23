import { IExchange } from './interfaces/exchange.interfacfe';

export class Exchanges {
  public static readonly users: IExchange = {
    name: 'users.topic.exchange',
    type: 'topic',
  };
}
