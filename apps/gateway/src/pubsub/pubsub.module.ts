import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

export const PUB_SUB = 'PUB_SUB';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: async (configService: ConfigService) => {
        const host = configService.redis.getHost();
        const port = configService.redis.getPort();
        const password = configService.redis.getPassword();

        const options: RedisOptions = {
          host,
          port,
          password,
          retryStrategy: () => 3000,
        };

        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
