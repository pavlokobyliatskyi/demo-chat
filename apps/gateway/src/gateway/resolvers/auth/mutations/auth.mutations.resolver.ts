import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLVoid } from 'graphql-scalars';
import { AuthSignUpInput } from './inputs/auth.sign-up.input';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Auth, Users } from '@demo-chat/shared';
import { AuthConfirmSignUpInput } from './inputs/auth.confirm-sign-up.input';
import { TokenType } from '../../../types';
import { AuthSignInInput } from './inputs/auth.sign-in.input';
import { AccessTokenGuard, RefreshTokenGuard } from '../../../guards';
import { CookiesService } from '../../../../cookies/services/cookies.service';
import { User } from '../../../decorators';
import { Response } from 'express';
import { AuthConfirmSignInInput } from './inputs/auth.confirm-sign-in.input';

@Resolver()
export class AuthMutationsResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(CookiesService) private readonly cookiesService: CookiesService
  ) {}

  @Mutation(() => GraphQLVoid, { nullable: true, name: 'signUp' })
  public async signUp(@Args('args') args: AuthSignUpInput) {
    await this.amqpConnection.request<Auth.AuthSignUpCommandContract.Response>({
      exchange: Auth.AuthSignUpCommandContract.exchange.auth.name,
      routingKey: Auth.AuthSignUpCommandContract.routing.signUpCommand.name,
      payload: {
        name: args.name,
        email: args.email,
      } as Auth.AuthSignUpCommandContract.Request,
    });

    return;
  }

  @Mutation(() => GraphQLVoid, { nullable: true, name: 'signIn' })
  public async signIn(@Args('args') args: AuthSignInInput) {
    await this.amqpConnection.request<Auth.AuthSignInCommandContract.Response>({
      exchange: Auth.AuthSignInCommandContract.exchange.auth.name,
      routingKey: Auth.AuthSignInCommandContract.routing.signInCommand.name,
      payload: {
        email: args.email,
      } as Auth.AuthSignInCommandContract.Request,
    });

    return;
  }

  @Mutation(() => TokenType, { nullable: true, name: 'confirmSignUp' })
  public async confirmSignUp(
    @Context('res') res: Response,
    @Args('args') args: AuthConfirmSignUpInput
  ) {
    const { accessToken, refreshToken } =
      await this.amqpConnection.request<Auth.AuthConfirmSignUpCommandContract.Response>(
        {
          exchange: Auth.AuthConfirmSignUpCommandContract.exchange.auth.name,
          routingKey:
            Auth.AuthConfirmSignUpCommandContract.routing.confirmSignUpCommand
              .name,
          payload: {
            email: args.email,
            code: args.code,
          } as Auth.AuthConfirmSignUpCommandContract.Request,
        }
      );

    // Set refresh token
    await this.cookiesService.setRefreshToken(res, refreshToken);

    return { accessToken };
  }

  @Mutation(() => TokenType, { nullable: true, name: 'confirmSignIn' })
  public async confirmSignIn(
    @Context('res') res: Response,
    @Args('args') args: AuthConfirmSignInInput
  ) {
    const { accessToken, refreshToken } =
      await this.amqpConnection.request<Auth.AuthConfirmSignInCommandContract.Response>(
        {
          exchange: Auth.AuthConfirmSignInCommandContract.exchange.auth.name,
          routingKey:
            Auth.AuthConfirmSignInCommandContract.routing.confirmSignInCommand
              .name,
          payload: {
            email: args.email,
            code: args.code,
          } as Auth.AuthConfirmSignInCommandContract.Request,
        }
      );

    // Set refresh token
    await this.cookiesService.setRefreshToken(res, refreshToken);

    return { accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => TokenType, { name: 'refreshToken', nullable: true })
  public async refreshToken(@User() user: Users.IUser) {
    const { accessToken } =
      await this.amqpConnection.request<Auth.AuthRefreshTokenCommandContract.Response>(
        {
          exchange: Auth.AuthRefreshTokenCommandContract.exchange.auth.name,
          routingKey:
            Auth.AuthRefreshTokenCommandContract.routing.refreshTokenCommand
              .name,
          payload: {
            userId: user._id,
          } as Auth.AuthRefreshTokenCommandContract.Request,
        }
      );

    return { accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => GraphQLVoid, { name: 'signOut', nullable: true })
  public async signOut(@Context('res') res: Response) {
    await this.cookiesService.clearRefreshToken(res);
  }
}
