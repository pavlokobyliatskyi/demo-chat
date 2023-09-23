import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { RabbitmqEnvs } from './envs/rabbitmq.envs';

@Injectable()
export class RabbitMQConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<RabbitmqEnvs>
  ) {}

  public getRabbitMQUser(): string {
    return this.configService.get('OTPS_RABBITMQ_USER');
  }

  public getRabbitMQPassword(): string {
    return this.configService.get('OTPS_RABBITMQ_PASSWORD');
  }

  public getRabbitMQHost(): string {
    return this.configService.get('OTPS_RABBITMQ_HOST');
  }

  public getRabbitMQPort(): number {
    return Number(this.configService.get('OTPS_RABBITMQ_PORT'));
  }
}
