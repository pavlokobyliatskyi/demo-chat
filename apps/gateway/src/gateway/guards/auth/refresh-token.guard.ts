import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Request } from 'express';
import { Auth } from '@demo-chat/shared';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CookiesService } from '../../../cookies/services/cookies.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(CookiesService) private readonly cookiesService: CookiesService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlctx = GqlExecutionContext.create(context);
    const { req, res } = gqlctx.getContext();

    const token = this.extractTokenFromCookie(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    const { user } =
      await this.amqpConnection.request<Auth.AuthVerifyRefreshTokenCommandContract.Response>(
        {
          exchange:
            Auth.AuthVerifyRefreshTokenCommandContract.exchange.auth.name,
          routingKey:
            Auth.AuthVerifyRefreshTokenCommandContract.routing
              .verifyRefreshTokenCommand.name,
          payload: {
            token,
          } as Auth.AuthVerifyRefreshTokenCommandContract.Request,
        }
      );

    if (!user) {
      // In fact, here we just need to redirect to the exit, we don't need to know about the exit logic (temp)
      await this.cookiesService.clearRefreshToken(res);
      throw new UnauthorizedException();
    }

    req['user'] = user;

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['refreshToken'];
  }
}
