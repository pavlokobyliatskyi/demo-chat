import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          autoSchemaFile: join(
            process.cwd(),
            '/libs/shared/src/lib/gateway/graphql/schema.graphql'
          ),
          introspection: true,
          sortSchema: true,
          context: ({ req, res }) => ({ req, res }),
          formatError: (e: GraphQLError) => {
            new Logger(GraphQLModule.name).error(JSON.stringify(e));
            return e?.extensions?.originalError as GraphQLFormattedError;
          },
          uploads: false,
          useGlobalPrefix: true,
          path: '/graphql',
          installSubscriptionHandlers: true,
          subscriptions: {
            'graphql-ws': true,
            // 'subscriptions-transport-ws': true,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GraphQLInitModule {}
