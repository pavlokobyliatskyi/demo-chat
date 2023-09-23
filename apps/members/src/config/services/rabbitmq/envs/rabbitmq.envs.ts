import { IsNumber, IsString } from 'class-validator';

export class RabbitmqEnvs {
  @IsString()
  MEMBERS_RABBITMQ_USER: string;

  @IsString()
  MEMBERS_RABBITMQ_PASSWORD: string;

  @IsString()
  MEMBERS_RABBITMQ_HOST: string;

  @IsNumber()
  MEMBERS_RABBITMQ_PORT: number;
}
