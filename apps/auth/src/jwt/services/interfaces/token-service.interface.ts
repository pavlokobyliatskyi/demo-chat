import { Auth } from '@demo-chat/shared';

export class ITokenService {
  sign: (args: Auth.ITokenPayload) => Promise<string>;
  verify: (token: string) => Promise<Auth.ITokenPayload>;
}
