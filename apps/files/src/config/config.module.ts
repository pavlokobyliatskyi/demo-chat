import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitmqEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { PostgresEnvs } from './services/postgres/envs/postgres.envs';
import { PostgresConfigService } from './services/postgres/postgres-config.service';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';
import { MinioConfigService } from './services/minio/minio-config.service';
import { MinioEnvs } from './services/minio/envs/minio.envs';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([
          RabbitmqEnvs,
          PostgresEnvs,
          MicroserviceEnvs,
          MinioEnvs,
        ]).validate(config),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    PostgresConfigService,
    MicroserviceConfigService,
    MinioConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
