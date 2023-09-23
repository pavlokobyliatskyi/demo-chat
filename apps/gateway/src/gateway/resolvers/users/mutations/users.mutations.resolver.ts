import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../../guards';
import { User } from '../../../decorators';
import { Users } from '@demo-chat/shared';
import { UsersUpdateUserInput } from './inputs/users.update-user.input';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UserType } from '../../../types';

@Resolver()
export class UsersMutationsResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Mutation(() => UserType, { name: 'updateInfo' })
  public async updateInfo(
    @User() user: Users.IUser,
    @Args('args') args: UsersUpdateUserInput
  ) {
    const result =
      await this.amqpConnection.request<Users.UsersChangeInfoCommandContract.Response>(
        {
          exchange: Users.UsersChangeInfoCommandContract.exchange.users.name,
          routingKey:
            Users.UsersChangeInfoCommandContract.routing.changeInfoCommand.name,
          payload: {
            _id: user._id,
            name: args.name,
            pictureFileId: args.pictureFileId,
          } as Users.UsersChangeInfoCommandContract.Request,
        }
      );

    if (!result) {
      throw new BadRequestException(
        'It is not possible to change the information.'
      );
    }

    return {
      ...user,
      name: args?.name || user.name,
      pictureFileId: args?.pictureFileId || user.pictureFileId,
    };
  }
}
