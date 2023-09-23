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

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlctx = GqlExecutionContext.create(context);
    const { req } = gqlctx.getContext();

    // Get token from headers
    let token = this.extractTokenFromHeader(req);

    if (!token) {
      // Get token from connection params
      token = this.extractTokenFromConnectionParams(req);
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    const { user } =
      await this.amqpConnection.request<Auth.AuthVerifyAccessTokenCommandContract.Response>(
        {
          exchange:
            Auth.AuthVerifyAccessTokenCommandContract.exchange.auth.name,
          routingKey:
            Auth.AuthVerifyAccessTokenCommandContract.routing
              .verifyAccessTokenCommand.name,
          payload: {
            token,
          } as Auth.AuthVerifyAccessTokenCommandContract.Request,
        }
      );

    if (!user) {
      throw new UnauthorizedException();
    }

    req['user'] = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request?.headers?.authorization) {
      return;
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromConnectionParams(
    request: Request
  ): string | undefined {
    if (!request['connectionParams']['Authorization']) {
      return;
    }

    const [type, token] =
      request['connectionParams']['Authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
