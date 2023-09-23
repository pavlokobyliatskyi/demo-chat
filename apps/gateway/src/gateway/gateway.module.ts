import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { GraphQLInitModule } from '../graphql-init/graphql-init.module';
import { AuthMutationsResolver } from './resolvers/auth/mutations/auth.mutations.resolver';
import { UsersQueriesResolver } from './resolvers/users/queries/users.queries.resolver';
import { ChatsQueriesResolver } from './resolvers/chats/queries/chats.queries.resolver';
import { MembersQueriesResolver } from './resolvers/members/queries/members.queries.resolver';
import { MembersMutationsResolver } from './resolvers/members/mutations/members.mutations.resolver';
import { MessagesSubscriptionsResolver } from './resolvers/messages/subscriptions/messages.subscriptions.resolver';
import { PubSubModule } from '../pubsub/pubsub.module';
import { MessagesEvents } from './events/messages.events';
import { MessagesMutationsResolver } from './resolvers/messages/mutations/messages.mutations.resolver';
import { MessagesQueriesResolver } from './resolvers/messages/queries/messages.queries.resolver';
import { FilesMutationsResolver } from './resolvers/files/mutations/files.mutations.resolver';
import { SearchQueriesResolver } from './resolvers/search/queries/search.queries.resolver';
import { CookiesModule } from '../cookies/cookies.module';
import { MembersEvents } from './events/members.events';
import { ChatsSubscriptionsResolver } from './resolvers/chats/subscriptions/chats.subscriptions.resolver';
import { MembersSubscriptionsResolver } from './resolvers/members/subscriptions/members.subscriptions.resolver';
import { UsersMutationsResolver } from './resolvers/users/mutations/users.mutations.resolver';
import { UsersDataLoader, ChatsDataLoader } from './data-loaders';

@Module({
  imports: [
    RabbitMQInitModule,
    LoggerModule,
    GraphQLInitModule,
    PubSubModule,
    CookiesModule,
  ],
  controllers: [MessagesEvents, MembersEvents],
  providers: [
    AuthMutationsResolver,
    UsersQueriesResolver,
    ChatsQueriesResolver,
    MembersQueriesResolver,
    MembersMutationsResolver,
    MessagesSubscriptionsResolver,
    MessagesMutationsResolver,
    MessagesQueriesResolver,
    FilesMutationsResolver,
    SearchQueriesResolver,
    ChatsSubscriptionsResolver,
    MembersSubscriptionsResolver,
    UsersMutationsResolver,
    UsersDataLoader,
    ChatsDataLoader,
  ],
})
export class GatewayModule {}
