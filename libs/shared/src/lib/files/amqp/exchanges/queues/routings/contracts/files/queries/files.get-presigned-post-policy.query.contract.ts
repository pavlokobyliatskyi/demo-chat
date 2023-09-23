import { Exchanges } from '../../../../../exchanges';
import { Queues } from '../../../../queues';
import { IsNumber, IsString } from 'class-validator';
import { Routings } from '../../../routings';

export namespace FilesGetPresignedPostPolicyQueryContract {
  export const exchange = {
    files: Exchanges.files,
  };

  export const routing = {
    getPresignedPostPolicyQuery: Routings.getPresignedPostPolicyQuery,
  };

  export const queue = {
    files: Queues.files,
  };

  export class Request {
    @IsString()
    name: string;

    @IsNumber()
    size: number;

    @IsString()
    type: string;
  }

  export class Response {
    id: string;
    postUrl: string;
    formData: {
      bucket: string;
      key: string;
      contentType: string;
      contentDisposition: string;
      xAmzDate: string;
      xAmzAlgorithm: string;
      xAmzCredential: string;
      policy: string;
      xAmzSignature: string;
    };
  }
}
