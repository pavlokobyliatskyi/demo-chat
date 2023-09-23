import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly logs: IQueue = {
    name: `${Exchanges.logs.name}.logs.queue`,
    options: {
      durable: false,
    },
  };
}
