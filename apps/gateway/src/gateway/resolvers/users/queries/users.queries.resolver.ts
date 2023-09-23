import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from '../../../types';
import { Inject, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../../guards';
import { User } from '../../../decorators';
import { Files, Users } from '@demo-chat/shared';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Resolver(() => UserType)
export class UsersQueriesResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => UserType, { name: 'user' })
  public async user(@User() user: Users.IUser) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      pictureFileId: user.pictureFileId,
    };
  }

  @ResolveField(() => String, { name: 'pictureUrl' })
  public async pictureFileId(
    @Parent() args: Omit<UserType, 'pictureUrl'> & { pictureFileId: string }
  ) {
    // Get an existing image (temp)
    if (!args?.pictureFileId) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png';
    }

    return await this.amqpConnection.request<Files.FilesGetPresignedUrlQueryContract.Response>(
      {
        exchange: Files.FilesGetPresignedUrlQueryContract.exchange.files.name,
        routingKey:
          Files.FilesGetPresignedUrlQueryContract.routing.getPresignedUrlQuery
            .name,
        payload: {
          id: args.pictureFileId,
        } as Files.FilesGetPresignedUrlQueryContract.Request,
      }
    );
  }
}
