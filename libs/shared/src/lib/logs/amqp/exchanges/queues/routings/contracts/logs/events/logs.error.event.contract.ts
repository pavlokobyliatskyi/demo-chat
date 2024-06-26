import { Exchanges } from '../../../../../exchanges';
import { IsOptional } from 'class-validator';
import { Queues } from '../../../../queues';
import { Routings } from '../../../routings';

export namespace LogsErrorEventContract {
  export const exchange = {
    logs: Exchanges.logs,
  };

  export const routing = {
    errorEvent: Routings.errorEvent,
  };

  export const queue = {
    logs: Queues.logs,
  };

  export class Request {
    message: unknown;

    @IsOptional()
    trace?: string;

    @IsOptional()
    context?: string;
  }

  export type Response = void;
}
