import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly search: IQueue = {
    name: `${Exchanges.search.name}.search.queue`,
    options: {
      durable: false,
    },
  };
}
