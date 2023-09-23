import { IsNumber, IsString } from 'class-validator';

export class RedisEnvs {
  @IsString()
  OTPS_REDIS_HOST: string;

  @IsString()
  OTPS_REDIS_PASSWORD: string;

  @IsNumber()
  OTPS_REDIS_PORT: number;
}
