import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly chats: IQueue = {
    name: `${Exchanges.chats.name}.chats.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly members: IQueue = {
    name: `${Exchanges.chats.name}.members.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly search: IQueue = {
    name: `${Exchanges.chats.name}.search.queue`,
    options: {
      durable: false,
    },
  };
}
