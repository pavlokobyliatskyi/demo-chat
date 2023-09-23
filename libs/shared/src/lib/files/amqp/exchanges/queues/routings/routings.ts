import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly getPresignedPostPolicyQuery: IRouting = {
    name: `${Exchanges.files.name}.get-presigned-post-policy.query.routing`,
  };

  public static readonly getPresignedUrlQuery: IRouting = {
    name: `${Exchanges.files.name}.get-presigned-url.query.routing`,
  };
}
