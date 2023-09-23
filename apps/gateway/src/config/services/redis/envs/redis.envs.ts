import { IsNumber, IsString } from 'class-validator';

export class RedisEnvs {
  @IsString()
  GATEWAY_REDIS_HOST: string;

  @IsString()
  GATEWAY_REDIS_PASSWORD: string;

  @IsNumber()
  GATEWAY_REDIS_PORT: number;
}
