import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config/dist/config.service';
import { RedisEnvs } from './envs/redis.envs';

@Injectable()
export class RedisConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<RedisEnvs>
  ) {}

  public getHost(): string {
    return this.configService.get('GATEWAY_REDIS_HOST');
  }

  public getPort(): number {
    return Number(this.configService.get('GATEWAY_REDIS_PORT'));
  }

  public getPassword(): string {
    return this.configService.get('GATEWAY_REDIS_PASSWORD');
  }
}
