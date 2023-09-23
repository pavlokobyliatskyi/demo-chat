import { IsNumber, IsString } from 'class-validator';

export class RabbitMQEnvs {
  @IsString()
  GATEWAY_RABBITMQ_USER: string;

  @IsString()
  GATEWAY_RABBITMQ_PASSWORD: string;

  @IsString()
  GATEWAY_RABBITMQ_HOST: string;

  @IsNumber()
  GATEWAY_RABBITMQ_PORT: number;
}
