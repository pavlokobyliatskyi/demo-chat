import { Controller, Inject, Logger } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Users } from '@demo-chat/shared';

@Controller()
export class UsersCommands {
  private readonly logger = new Logger(UsersCommands.name);

  constructor(
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  @RabbitRPC({
    exchange: Users.UsersCreateUserCommandContract.exchange.users.name,
    routingKey:
      Users.UsersCreateUserCommandContract.routing.createUserCommand.name,
    queue: Users.UsersCreateUserCommandContract.queue.users.name,
    queueOptions: Users.UsersCreateUserCommandContract.queue.users.options,
  })
  public async createUser(
    @RabbitPayload() args: Users.UsersCreateUserCommandContract.Request
  ): Promise<Users.UsersCreateUserCommandContract.Response> {
    this.logger.log(`Create user ${JSON.stringify(args)}`);

    const newUser = await this.usersService.create({
      name: args.name,
      email: args.email,
    });

    return {
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isEmailVerified: newUser.isEmailVerified,
        pictureFileId: newUser?.pictureFileId,
      },
    };
  }

  @RabbitRPC({
    exchange: Users.UsersVerifyEmailCommandContract.exchange.users.name,
    routingKey:
      Users.UsersVerifyEmailCommandContract.routing.verifyEmailCommand.name,
    queue: Users.UsersVerifyEmailCommandContract.queue.users.name,
    queueOptions: Users.UsersVerifyEmailCommandContract.queue.users.options,
  })
  public async verifyEmail(
    @RabbitPayload() args: Users.UsersVerifyEmailCommandContract.Request
  ): Promise<Users.UsersVerifyEmailCommandContract.Response> {
    this.logger.log(`Verify email ${JSON.stringify(args)}`);

    const result = await this.usersService.verifyEmail(args.email);

    return !!result.acknowledged;
  }

  @RabbitRPC({
    exchange: Users.UsersChangeInfoCommandContract.exchange.users.name,
    routingKey:
      Users.UsersChangeInfoCommandContract.routing.changeInfoCommand.name,
    queue: Users.UsersChangeInfoCommandContract.queue.users.name,
    queueOptions: Users.UsersChangeInfoCommandContract.queue.users.options,
  })
  public async changeInfo(
    @RabbitPayload() args: Users.UsersChangeInfoCommandContract.Request
  ): Promise<Users.UsersChangeInfoCommandContract.Response> {
    this.logger.log(`Change user info ${JSON.stringify(args)}`);

    const { _id, ...rest } = args;

    const result = await this.usersService.changeInfo(_id, rest);

    return !!result.acknowledged;
  }
}
