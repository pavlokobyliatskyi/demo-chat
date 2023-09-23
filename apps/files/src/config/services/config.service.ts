import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';
import { PostgresConfigService } from './postgres/postgres-config.service';
import { MicroserviceConfigService } from './microservice/microservice-config.service';
import { MinioConfigService } from './minio/minio-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService,
    @Inject(PostgresConfigService)
    public readonly postgres: PostgresConfigService,
    @Inject(MicroserviceConfigService)
    public readonly microservice: MicroserviceConfigService,
    @Inject(MinioConfigService) public readonly minio: MinioConfigService
  ) {}
}
