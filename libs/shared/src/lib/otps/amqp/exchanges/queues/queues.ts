import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly otps: IQueue = {
    name: `${Exchanges.otps.name}.otps.queue`,
    options: {
      durable: false,
    },
  };
}
