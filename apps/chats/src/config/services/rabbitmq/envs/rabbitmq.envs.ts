import { IsNumber, IsString } from 'class-validator';

export class RabbitMQEnvs {
  @IsString()
  CHATS_RABBITMQ_USER: string;

  @IsString()
  CHATS_RABBITMQ_PASSWORD: string;

  @IsString()
  CHATS_RABBITMQ_HOST: string;

  @IsNumber()
  CHATS_RABBITMQ_PORT: number;
}
