import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly users: IQueue = {
    name: `${Exchanges.users.name}.users.queue`,
    options: {
      durable: false,
    },
  };
}
