import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly files: IQueue = {
    name: `${Exchanges.files.name}.files.queue`,
    options: {
      durable: false,
    },
  };
}
