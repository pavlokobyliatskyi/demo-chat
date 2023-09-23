import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitmqEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { RedisEnvs } from './services/redis/envs/redis.envs';
import { RedisConfigService } from './services/redis/redis-config.service';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([
          RabbitmqEnvs,
          RedisEnvs,
          MicroserviceEnvs,
        ]).validate(config),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    RedisConfigService,
    MicroserviceConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
