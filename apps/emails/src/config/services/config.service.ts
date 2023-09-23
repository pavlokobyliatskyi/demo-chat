import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';
import { EmailConfigService } from './email/email-config.service';
import { MicroserviceConfigService } from './microservice/microservice-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService,
    @Inject(EmailConfigService) public readonly email: EmailConfigService,
    @Inject(MicroserviceConfigService)
    public readonly microservice: MicroserviceConfigService
  ) {}
}
