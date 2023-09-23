import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly auth: IQueue = {
    name: `${Exchanges.auth.name}.auth.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly chats: IQueue = {
    name: `${Exchanges.auth.name}.chats.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly emails: IQueue = {
    name: `${Exchanges.auth.name}.emails.queue`,
    options: {
      durable: false,
    },
  };
}
