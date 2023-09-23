import { IsNumber, IsString } from 'class-validator';

export class RabbitmqEnvs {
  @IsString()
  USERS_RABBITMQ_USER: string;

  @IsString()
  USERS_RABBITMQ_PASSWORD: string;

  @IsString()
  USERS_RABBITMQ_HOST: string;

  @IsNumber()
  USERS_RABBITMQ_PORT: number;
}
