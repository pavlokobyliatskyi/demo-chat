import { IsNumber, IsString } from 'class-validator';

export class RabbitmqEnvs {
  @IsString()
  OTPS_RABBITMQ_USER: string;

  @IsString()
  OTPS_RABBITMQ_PASSWORD: string;

  @IsString()
  OTPS_RABBITMQ_HOST: string;

  @IsNumber()
  OTPS_RABBITMQ_PORT: number;
}
