import { Inject, Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Users } from '@demo-chat/shared';

@Injectable({ scope: Scope.REQUEST })
export class UsersDataLoader {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  public readonly batchUsers = new DataLoader(async (userIds: string[]) => {
    const { users } =
      await this.amqpConnection.request<Users.UsersGetUserListQueryContract.Response>(
        {
          exchange: Users.UsersGetUserListQueryContract.exchange.users.name,
          routingKey:
            Users.UsersGetUserListQueryContract.routing.getUserListQuery.name,
          payload: {
            userIds,
          } as Users.UsersGetUserListQueryContract.Request,
        }
      );

    const usersMap = new Map(users.map((user) => [user._id, user]));

    return userIds.map((userId) => usersMap.get(userId));
  });
}
