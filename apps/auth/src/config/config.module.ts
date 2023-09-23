import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { RabbitMQEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';
import { JwtConfigService } from './services/jwt/jwt-config.service';
import { JwtEnvs } from './services/jwt/envs/jwt.envs';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([RabbitMQEnvs, MicroserviceEnvs, JwtEnvs]).validate(
          config
        ),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    MicroserviceConfigService,
    JwtConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
