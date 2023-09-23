import { IsNumber, IsString } from 'class-validator';

export class RabbitMQEnvs {
  @IsString()
  AUTH_RABBITMQ_USER: string;

  @IsString()
  AUTH_RABBITMQ_PASSWORD: string;

  @IsString()
  AUTH_RABBITMQ_HOST: string;

  @IsNumber()
  AUTH_RABBITMQ_PORT: number;
}
