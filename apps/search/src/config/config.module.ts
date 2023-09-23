import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { RabbitmqEnvs } from './services/rabbitmq/envs/rabbitmq.envs';
import { RabbitMQConfigService } from './services/rabbitmq/rabbitmq-config.service';
import { ConfigService } from './services/config.service';
import { ElasticsearchEnvs } from './services/elasticsearch/envs/elasticsearch.envs';
import { ElasticsearchConfigService } from './services/elasticsearch/elasticsearch-config.service';
import { ConfigValidator } from './validators/config.validator';
import { MicroserviceEnvs } from './services/microservice/envs/microservice.envs';
import { MicroserviceConfigService } from './services/microservice/microservice-config.service';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) =>
        new ConfigValidator([
          RabbitmqEnvs,
          ElasticsearchEnvs,
          MicroserviceEnvs,
        ]).validate(config),
    }),
  ],
  providers: [
    ConfigService,
    RabbitMQConfigService,
    ElasticsearchConfigService,
    MicroserviceConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
