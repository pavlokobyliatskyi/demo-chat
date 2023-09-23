import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbitmq/rabbitmq-config.service';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(RabbitMQConfigService)
    public readonly rabbitmq: RabbitMQConfigService
  ) {}
}
