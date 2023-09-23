import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitMQEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { ConfigValidator } from './validators/config.validator';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([RabbitMQEnvs]).validate(config),
    }),
  ],
  providers: [ConfigService, RabbitMQConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
