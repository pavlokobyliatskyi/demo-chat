import { IsNumber, IsString } from 'class-validator';

export class RabbitMQEnvs {
  @IsString()
  LOGS_RABBITMQ_USER: string;

  @IsString()
  LOGS_RABBITMQ_PASSWORD: string;

  @IsString()
  LOGS_RABBITMQ_HOST: string;

  @IsNumber()
  LOGS_RABBITMQ_PORT: number;
}
