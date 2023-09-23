import { QueueOptions } from '@golevelup/nestjs-rabbitmq';

export interface IQueue {
  name: string;
  options?: QueueOptions;
}
