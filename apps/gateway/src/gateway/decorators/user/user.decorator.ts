import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Users } from '@demo-chat/shared';

export const User = createParamDecorator<unknown, unknown, Users.IUser>(
  (data: unknown, context: ExecutionContext) => {
    try {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
);
