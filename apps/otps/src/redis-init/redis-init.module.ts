import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { ConfigService } from '../config/services/config.service';
import { ConfigModule } from '../config/config.module';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const host = configService.redis.getRedisHost();
        const port = configService.redis.getRedisPort();
        const password = configService.redis.getRedisPassword();

        const client = createClient({
          url: `redis://:${password}@${host}:${port}/?timeout=60s`,
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisInitModule {}
