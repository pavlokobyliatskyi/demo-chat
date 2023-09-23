import { IsNumber, IsString } from 'class-validator';

export class RabbitMQEnvs {
  @IsString()
  EMAILS_RABBITMQ_USER: string;

  @IsString()
  EMAILS_RABBITMQ_PASSWORD: string;

  @IsString()
  EMAILS_RABBITMQ_HOST: string;

  @IsNumber()
  EMAILS_RABBITMQ_PORT: number;
}
