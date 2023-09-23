import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';
import { MongoDBConfigService } from './mongodb/mongodb-config.service';
import { MicroserviceConfigService } from './microservice/microservice-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService,
    @Inject(MongoDBConfigService)
    public readonly mongodb: MongoDBConfigService,
    @Inject(MicroserviceConfigService)
    public readonly microservice: MicroserviceConfigService
  ) {}
}
