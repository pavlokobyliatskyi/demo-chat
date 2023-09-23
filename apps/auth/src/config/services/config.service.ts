import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';
import { MicroserviceConfigService } from './microservice/microservice-config.service';
import { JwtConfigService } from './jwt/jwt-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService,
    @Inject(MicroserviceConfigService)
    public readonly microservice: MicroserviceConfigService,
    @Inject(JwtConfigService) public readonly jwt: JwtConfigService
  ) {}
}
