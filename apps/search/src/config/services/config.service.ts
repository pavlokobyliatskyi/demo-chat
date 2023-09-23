import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';
import { ElasticsearchConfigService } from './elasticsearch/elasticsearch-config.service';
import { MicroserviceConfigService } from './microservice/microservice-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService,
    @Inject(ElasticsearchConfigService)
    public readonly elasticsearch: ElasticsearchConfigService,
    @Inject(MicroserviceConfigService)
    public readonly microservice: MicroserviceConfigService
  ) {}
}
