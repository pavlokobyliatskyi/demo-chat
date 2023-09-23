import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitmqEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { MongoDBEnvs } from './services/mongodb/envs/mongodb.envs';
import { MongoDBConfigService } from './services/mongodb/mongodb-config.service';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([
          RabbitmqEnvs,
          MongoDBEnvs,
          MicroserviceEnvs,
        ]).validate(config),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    MongoDBConfigService,
    MicroserviceConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
