import { IExchange } from './interfaces/exchange.interfacfe';

export class Exchanges {
  public static readonly auth: IExchange = {
    name: 'auth.topic.exchange',
    type: 'topic',
  };
}
