import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { RabbitMQEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';
import { MongoDBConfigService } from './services/mongodb/mongodb-config.service';
import { MongoDBEnvs } from './services/mongodb/envs/mongodb.envs';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([
          RabbitMQEnvs,
          MicroserviceEnvs,
          MongoDBEnvs,
        ]).validate(config),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    MicroserviceConfigService,
    MongoDBConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
