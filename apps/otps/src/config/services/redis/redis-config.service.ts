import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config/dist/config.service';
import { RedisEnvs } from './envs/redis.envs';

@Injectable()
export class RedisConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<RedisEnvs>
  ) {}

  public getRedisHost(): string {
    return this.configService.get('OTPS_REDIS_HOST');
  }

  public getRedisPort(): number {
    return Number(this.configService.get('OTPS_REDIS_PORT'));
  }

  public getRedisPassword(): string {
    return this.configService.get('OTPS_REDIS_PASSWORD');
  }
}
