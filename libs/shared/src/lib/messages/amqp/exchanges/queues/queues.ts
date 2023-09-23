import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly messages: IQueue = {
    name: `${Exchanges.messages.name}.messages.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly gateway: IQueue = {
    name: `${Exchanges.messages.name}.gateway.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly search: IQueue = {
    name: `${Exchanges.messages.name}.search.queue`,
    options: {
      durable: false,
    },
  };
}
