import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { RabbitMQEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { EmailConfigService } from './services/email/email-config.service';
import { EmailEnvs } from './services/email/envs/email.envs';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([
          RabbitMQEnvs,
          EmailEnvs,
          MicroserviceEnvs,
        ]).validate(config),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    EmailConfigService,
    MicroserviceConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
