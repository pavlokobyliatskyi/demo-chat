import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SearchQInput } from './inputs/search.q.input';
import { AccessTokenGuard } from '../../../guards';
import { User } from '../../../decorators';
import { Messages, Search, Users } from '@demo-chat/shared';
import { MessageType } from '../../../types';

@Resolver()
export class SearchQueriesResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [MessageType], {
    name: 'search',
    description: 'Request to search for any messages in all your chats.',
  })
  public async search(
    @User() user: Users.IUser,
    @Args('args') args: SearchQInput
  ) {
    const { messageIds } =
      await this.amqpConnection.request<Search.SearchMessagesSearchQueryContract.Response>(
        {
          exchange:
            Search.SearchMessagesSearchQueryContract.exchange.search.name,
          routingKey:
            Search.SearchMessagesSearchQueryContract.routing.messagesSearchQuery
              .name,
          payload: {
            userId: user._id,
            query: args.query,
          } as Search.SearchMessagesSearchQueryContract.Request,
        }
      );

    if (!messageIds.length) {
      return [];
    }

    const { messages } =
      await this.amqpConnection.request<Messages.MessagesGetMessageListQueryContract.Response>(
        {
          exchange:
            Messages.MessagesGetMessageListQueryContract.exchange.messages.name,
          routingKey:
            Messages.MessagesGetMessageListQueryContract.routing
              .getMessageListQuery.name,
          payload: {
            messageIds,
          } as Messages.MessagesGetMessageListQueryContract.Request,
        }
      );

    return messages;
  }
}
