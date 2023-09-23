import {
  BadRequestException,
  Controller,
  Inject,
  Logger,
} from '@nestjs/common';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Auth, Otps, Users } from '@demo-chat/shared';
import { AccessTokenService } from '../../jwt/services/access-token.service';
import { RefreshTokenService } from '../../jwt/services/refresh-token.service';

@Controller()
export class AuthCommands {
  private readonly logger = new Logger(AuthCommands.name);

  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(AccessTokenService)
    private readonly accessTokenService: AccessTokenService,
    @Inject(RefreshTokenService)
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  @RabbitRPC({
    exchange: Auth.AuthSignUpCommandContract.exchange.auth.name,
    routingKey: Auth.AuthSignUpCommandContract.routing.signUpCommand.name,
    queue: Auth.AuthSignUpCommandContract.queue.auth.name,
    queueOptions: Auth.AuthSignUpCommandContract.queue.auth.options,
  })
  public async signUp(
    @RabbitPayload() args: Auth.AuthSignUpCommandContract.Request
  ): Promise<Auth.AuthSignUpCommandContract.Response> {
    this.logger.log(`Sign up ${JSON.stringify(args)}`);

    // Check if email is exist
    const { user: oldUser } =
      await this.amqpConnection.request<Users.UsersGetEmailInfoQueryContract.Response>(
        {
          exchange: Users.UsersGetEmailInfoQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetEmailInfoQueryContract.routing.getEmailInfoQuery.name,
          payload: {
            email: args.email,
          } as Users.UsersGetEmailInfoQueryContract.Request,
        }
      );

    // Check if email verified
    if (oldUser && oldUser?.isEmailVerified) {
      throw new BadRequestException('The user with the email already exists.');
    }

    // Send email if user exist but not verified
    if (oldUser && !oldUser?.isEmailVerified) {
      await this.amqpConnection.publish<Auth.AuthSignUpEventContract.Request>(
        Auth.AuthSignUpEventContract.exchange.auth.name,
        Auth.AuthSignUpEventContract.routing.signUpEvent.name,
        {
          _id: oldUser._id,
          name: oldUser.name,
          email: oldUser.email,
          isEmailVerified: oldUser.isEmailVerified,
        }
      );

      return;
    }

    // Create a user
    const { user: newUser } =
      await this.amqpConnection.request<Users.UsersCreateUserCommandContract.Response>(
        {
          exchange: Users.UsersCreateUserCommandContract.exchange.users.name,
          routingKey:
            Users.UsersCreateUserCommandContract.routing.createUserCommand.name,
          payload: {
            name: args.name,
            email: args.email,
          } as Users.UsersCreateUserCommandContract.Request,
        }
      );

    if (!newUser) {
      throw new BadRequestException('Failed to create a user.');
    }

    // Publish sign up event
    await this.amqpConnection.publish<Auth.AuthSignUpEventContract.Request>(
      Auth.AuthSignUpEventContract.exchange.auth.name,
      Auth.AuthSignUpEventContract.routing.signUpEvent.name,
      {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isEmailVerified: newUser.isEmailVerified,
      }
    );
  }

  @RabbitRPC({
    exchange: Auth.AuthSignInCommandContract.exchange.auth.name,
    routingKey: Auth.AuthSignInCommandContract.routing.signInCommand.name,
    queue: Auth.AuthSignInCommandContract.queue.auth.name,
    queueOptions: Auth.AuthSignInCommandContract.queue.auth.options,
  })
  public async signIn(
    @RabbitPayload() args: Auth.AuthSignInCommandContract.Request
  ): Promise<Auth.AuthSignInCommandContract.Response> {
    this.logger.log(`Sign in ${JSON.stringify(args)}`);

    // Check if email is exist
    const { user } =
      await this.amqpConnection.request<Users.UsersGetEmailInfoQueryContract.Response>(
        {
          exchange: Users.UsersGetEmailInfoQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetEmailInfoQueryContract.routing.getEmailInfoQuery.name,
          payload: {
            email: args.email,
          } as Users.UsersGetEmailInfoQueryContract.Request,
        }
      );

    // Check if email verified
    if (!user || !user?.isEmailVerified) {
      throw new BadRequestException(
        'The user with this email address does not exist or email address is not verified.'
      );
    }

    // Publish sign in event
    await this.amqpConnection.publish<Auth.AuthSignInEventContract.Request>(
      Auth.AuthSignInEventContract.exchange.auth.name,
      Auth.AuthSignInEventContract.routing.signInEvent.name,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      }
    );
  }

  @RabbitRPC({
    exchange: Auth.AuthConfirmSignUpCommandContract.exchange.auth.name,
    routingKey:
      Auth.AuthConfirmSignUpCommandContract.routing.confirmSignUpCommand.name,
    queue: Auth.AuthConfirmSignUpCommandContract.queue.auth.name,
    queueOptions: Auth.AuthConfirmSignUpCommandContract.queue.auth.options,
  })
  public async confirmSignUp(
    @RabbitPayload() args: Auth.AuthConfirmSignUpCommandContract.Request
  ): Promise<Auth.AuthConfirmSignUpCommandContract.Response> {
    this.logger.log(`Confirm sign up ${JSON.stringify(args)}`);

    // Check code
    const isVerified =
      await this.amqpConnection.request<Otps.OtpsVerifyCommandContract.Response>(
        {
          exchange: Otps.OtpsVerifyCommandContract.exchange.otps.name,
          routingKey: Otps.OtpsVerifyCommandContract.routing.verify.name,
          payload: {
            key: args.email,
            code: args.code,
          } as Otps.OtpsVerifyCommandContract.Request,
        }
      );

    if (!isVerified) {
      throw new BadRequestException('The code is invalid.');
    }

    // Verified email for user
    const verifyEmail = await this.amqpConnection.request({
      exchange: Users.UsersVerifyEmailCommandContract.exchange.users.name,
      routingKey:
        Users.UsersVerifyEmailCommandContract.routing.verifyEmailCommand.name,
      payload: {
        email: args.email,
      } as Users.UsersVerifyEmailCommandContract.Request,
    });

    if (!verifyEmail) {
      throw new BadRequestException('Failed to verify the email.');
    }

    // Geg email info
    const { user } =
      await this.amqpConnection.request<Users.UsersGetEmailInfoQueryContract.Response>(
        {
          exchange: Users.UsersGetEmailInfoQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetEmailInfoQueryContract.routing.getEmailInfoQuery.name,
          payload: {
            email: args.email,
          } as Users.UsersGetEmailInfoQueryContract.Request,
        }
      );

    // Publish confirm sign up event
    await this.amqpConnection.publish<Auth.AuthConfirmSignUpEventContract.Request>(
      Auth.AuthConfirmSignUpEventContract.exchange.auth.name,
      Auth.AuthConfirmSignUpEventContract.routing.confirmSignUpEvent.name,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      }
    );

    // Generate tokens
    const tokenPayload: Auth.ITokenPayload = {
      sub: user._id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.accessTokenService.sign(tokenPayload),
      this.refreshTokenService.sign(tokenPayload),
    ]);

    // Return jwt access and refresh tokens
    return {
      accessToken,
      refreshToken,
    };
  }

  @RabbitRPC({
    exchange: Auth.AuthConfirmSignInCommandContract.exchange.auth.name,
    routingKey:
      Auth.AuthConfirmSignInCommandContract.routing.confirmSignInCommand.name,
    queue: Auth.AuthConfirmSignInCommandContract.queue.auth.name,
    queueOptions: Auth.AuthConfirmSignInCommandContract.queue.auth.options,
  })
  public async confirmSignIn(
    @RabbitPayload() args: Auth.AuthConfirmSignInCommandContract.Request
  ): Promise<Auth.AuthConfirmSignInCommandContract.Response> {
    this.logger.log(`Confirm sign in ${JSON.stringify(args)}`);

    // Check code
    const isVerified =
      await this.amqpConnection.request<Otps.OtpsVerifyCommandContract.Response>(
        {
          exchange: Otps.OtpsVerifyCommandContract.exchange.otps.name,
          routingKey: Otps.OtpsVerifyCommandContract.routing.verify.name,
          payload: {
            key: args.email,
            code: args.code,
          } as Otps.OtpsVerifyCommandContract.Request,
        }
      );

    if (!isVerified) {
      // Publish log
      throw new BadRequestException('The code is invalid.');
    }

    // Geg email info
    const { user } =
      await this.amqpConnection.request<Users.UsersGetEmailInfoQueryContract.Response>(
        {
          exchange: Users.UsersGetEmailInfoQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetEmailInfoQueryContract.routing.getEmailInfoQuery.name,
          payload: {
            email: args.email,
          } as Users.UsersGetEmailInfoQueryContract.Request,
        }
      );

    // Generate tokens
    const tokenPayload: Auth.ITokenPayload = {
      sub: user._id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.accessTokenService.sign(tokenPayload),
      this.refreshTokenService.sign(tokenPayload),
    ]);

    // Return jwt access and refresh tokens
    return {
      accessToken,
      refreshToken,
    };
  }

  @RabbitRPC({
    exchange: Auth.AuthVerifyAccessTokenCommandContract.exchange.auth.name,
    routingKey:
      Auth.AuthVerifyAccessTokenCommandContract.routing.verifyAccessTokenCommand
        .name,
    queue: Auth.AuthVerifyAccessTokenCommandContract.queue.auth.name,
    queueOptions: Auth.AuthVerifyAccessTokenCommandContract.queue.auth.options,
  })
  public async verifyAccessToken(
    @RabbitPayload() args: Auth.AuthVerifyAccessTokenCommandContract.Request
  ): Promise<Auth.AuthVerifyAccessTokenCommandContract.Response> {
    this.logger.log(`Verify access token ${JSON.stringify(args)}`);

    // Verify token
    const payload = await this.accessTokenService.verify(args.token);

    if (!payload) {
      return {
        user: null,
      };
    }

    // Return user
    const { user } =
      await this.amqpConnection.request<Users.UsersGetUserQueryContract.Response>(
        {
          exchange: Users.UsersGetUserQueryContract.exchange.users.name,
          routingKey: Users.UsersGetUserQueryContract.routing.getUserQuery.name,
          payload: {
            _id: payload.sub,
          } as Users.UsersGetUserQueryContract.Request,
        }
      );

    if (!user) {
      return {
        user: null,
      };
    }

    return { user };
  }

  @RabbitRPC({
    exchange: Auth.AuthVerifyRefreshTokenCommandContract.exchange.auth.name,
    routingKey:
      Auth.AuthVerifyRefreshTokenCommandContract.routing
        .verifyRefreshTokenCommand.name,
    queue: Auth.AuthVerifyRefreshTokenCommandContract.queue.auth.name,
    queueOptions: Auth.AuthVerifyRefreshTokenCommandContract.queue.auth.options,
  })
  public async verifyRefreshToken(
    @RabbitPayload() args: Auth.AuthVerifyRefreshTokenCommandContract.Request
  ): Promise<Auth.AuthVerifyRefreshTokenCommandContract.Response> {
    this.logger.log(`Verify refresh token ${JSON.stringify(args)}`);

    // Verify token
    const payload = await this.refreshTokenService.verify(args.token);

    if (!payload) {
      return {
        user: null,
      };
    }

    // Return user
    const { user } =
      await this.amqpConnection.request<Users.UsersGetUserQueryContract.Response>(
        {
          exchange: Users.UsersGetUserQueryContract.exchange.users.name,
          routingKey: Users.UsersGetUserQueryContract.routing.getUserQuery.name,
          payload: {
            _id: payload.sub,
          } as Users.UsersGetUserQueryContract.Request,
        }
      );

    if (!user) {
      return {
        user: null,
      };
    }

    return { user };
  }

  @RabbitRPC({
    exchange: Auth.AuthRefreshTokenCommandContract.exchange.auth.name,
    routingKey:
      Auth.AuthRefreshTokenCommandContract.routing.refreshTokenCommand.name,
    queue: Auth.AuthRefreshTokenCommandContract.queue.auth.name,
    queueOptions: Auth.AuthRefreshTokenCommandContract.queue.auth.options,
  })
  public async refreshToken(
    @RabbitPayload() args: Auth.AuthRefreshTokenCommandContract.Request
  ): Promise<Auth.AuthRefreshTokenCommandContract.Response> {
    this.logger.log(`Refresh token ${JSON.stringify(args)}`);

    const tokenPayload: Auth.ITokenPayload = {
      sub: args.userId,
    };

    const accessToken = await this.accessTokenService.sign(tokenPayload);

    return { accessToken };
  }
}
