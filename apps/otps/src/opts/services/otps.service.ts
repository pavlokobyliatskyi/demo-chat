import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT } from '../../redis-init/redis-init.module';
import { CodeService } from '../../code/services/code.service';

@Injectable()
export class OtpsService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: RedisClientType,
    @Inject(CodeService) private readonly codeService: CodeService
  ) {}

  public async generate(key: string) {
    const code = this.codeService.generate();

    await this.redisClient.set(key, code);
    await this.redisClient.expire(key, 60);

    return code;
  }

  public async verify(key: string, code: string) {
    const value = await this.redisClient.get(key);

    if (!value) {
      return false;
    }

    if (value !== code) {
      return false;
    }

    await this.redisClient.del(key);

    return true;
  }
}
