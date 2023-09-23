import { IsNumber, IsString } from 'class-validator';

export class RabbitmqEnvs {
  @IsString()
  FILES_RABBITMQ_USER: string;

  @IsString()
  FILES_RABBITMQ_PASSWORD: string;

  @IsString()
  FILES_RABBITMQ_HOST: string;

  @IsNumber()
  FILES_RABBITMQ_PORT: number;
}
