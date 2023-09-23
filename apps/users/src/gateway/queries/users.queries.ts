import { Controller, Inject, Logger } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Users } from '@demo-chat/shared';
import { UsersService } from '../../users/services/users.service';

@Controller()
export class UsersQueries {
  private readonly logger = new Logger(UsersQueries.name);

  constructor(
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  @RabbitRPC({
    exchange: Users.UsersGetEmailInfoQueryContract.exchange.users.name,
    routingKey:
      Users.UsersGetEmailInfoQueryContract.routing.getEmailInfoQuery.name,
    queue: Users.UsersGetEmailInfoQueryContract.queue.users.name,
    queueOptions: Users.UsersGetEmailInfoQueryContract.queue.users.options,
  })
  public async getEmailInfo(
    @RabbitPayload() args: Users.UsersGetEmailInfoQueryContract.Request
  ): Promise<Users.UsersGetEmailInfoQueryContract.Response> {
    this.logger.log(`Get email info ${JSON.stringify(args)}`);

    const user = await this.usersService.findByEmail(args.email);

    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        pictureFileId: user?.pictureFileId,
      },
    };
  }

  @RabbitRPC({
    exchange: Users.UsersGetUserQueryContract.exchange.users.name,
    routingKey: Users.UsersGetUserQueryContract.routing.getUserQuery.name,
    queue: Users.UsersGetUserQueryContract.queue.users.name,
    queueOptions: Users.UsersGetUserQueryContract.queue.users.options,
  })
  public async getUser(
    @RabbitPayload() args: Users.UsersGetUserQueryContract.Request
  ): Promise<Users.UsersGetUserQueryContract.Response> {
    this.logger.log(`Get user ${JSON.stringify(args)}`);

    const user = await this.usersService.findById(args._id);

    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        pictureFileId: user?.pictureFileId,
      },
    };
  }

  @RabbitRPC({
    exchange: Users.UsersGetUserListQueryContract.exchange.users.name,
    routingKey:
      Users.UsersGetUserListQueryContract.routing.getUserListQuery.name,
    queue: Users.UsersGetUserListQueryContract.queue.users.name,
    queueOptions: Users.UsersGetUserListQueryContract.queue.users.options,
  })
  public async getUserList(
    @RabbitPayload() args: Users.UsersGetUserListQueryContract.Request
  ): Promise<Users.UsersGetUserListQueryContract.Response> {
    this.logger.log(`Get user list ${JSON.stringify(args)}`);

    // Get users (no sorted)
    const users = await this.usersService.findByIds(args.userIds);

    return {
      users: users.map((user) => ({
        _id: user.id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        pictureFileId: user.pictureFileId,
      })),
    };
  }
}
