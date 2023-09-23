import { IsNumber, IsString } from 'class-validator';

export class RabbitmqEnvs {
  @IsString()
  MESSAGES_RABBITMQ_USER: string;

  @IsString()
  MESSAGES_RABBITMQ_PASSWORD: string;

  @IsString()
  MESSAGES_RABBITMQ_HOST: string;

  @IsNumber()
  MESSAGES_RABBITMQ_PORT: number;
}
