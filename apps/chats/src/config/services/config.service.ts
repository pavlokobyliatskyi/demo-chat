import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';
import { MicroserviceConfigService } from './microservice/microservice-config.service';
import { MongoDBConfigService } from './mongodb/mongodb-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService,
    @Inject(MicroserviceConfigService)
    public readonly microservice: MicroserviceConfigService,
    @Inject(MongoDBConfigService) public readonly mongodb: MongoDBConfigService
  ) {}
}
