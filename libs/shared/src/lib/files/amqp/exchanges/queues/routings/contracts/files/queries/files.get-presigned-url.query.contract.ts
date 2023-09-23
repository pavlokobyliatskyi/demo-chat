import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsUUID } from 'class-validator';
import { Routings } from '../../../routings';

export namespace FilesGetPresignedUrlQueryContract {
  export const exchange = {
    files: Exchanges.files,
  };

  export const routing = {
    getPresignedUrlQuery: Routings.getPresignedUrlQuery,
  };

  export const queue = {
    files: Queues.files,
  };

  export class Request {
    @IsUUID('4')
    id: string;
  }

  export type Response = string | null;
}
