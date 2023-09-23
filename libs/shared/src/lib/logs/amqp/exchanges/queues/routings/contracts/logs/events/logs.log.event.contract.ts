import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsOptional } from 'class-validator';
import { Routings } from '../../../routings';

export namespace LogsLogEventContract {
  export const exchange = {
    logs: Exchanges.logs,
  };

  export const routing = {
    logEvent: Routings.logEvent,
  };

  export const queue = {
    logs: Queues.logs,
  };

  export class Request {
    message: unknown;

    @IsOptional()
    context?: string;
  }

  export type Response = void;
}
