import { Exchanges } from '../exchanges';
import { IQueue } from './interfaces/queue.interface';

export class Queues {
  public static readonly members: IQueue = {
    name: `${Exchanges.members.name}.members.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly gateway: IQueue = {
    name: `${Exchanges.members.name}.gateway.queue`,
    options: {
      durable: false,
    },
  };

  public static readonly chats: IQueue = {
    name: `${Exchanges.members.name}.chats.queue`,
    options: {
      durable: false,
    },
  };
}
