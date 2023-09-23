import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { PostgresEnvs } from './envs/postgres.envs';

@Injectable()
export class PostgresConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<PostgresEnvs>
  ) {}

  public getHost(): string {
    return this.configService.get('FILES_POSTGRES_HOST');
  }

  public getPort(): number {
    return Number(this.configService.get('FILES_POSTGRES_PORT'));
  }

  public getUser(): string {
    return this.configService.get('FILES_POSTGRES_USER');
  }

  public getPassword(): string {
    return this.configService.get('FILES_POSTGRES_PASSWORD');
  }

  public getDatabase(): string {
    return this.configService.get('FILES_POSTGRES_DATABASE');
  }
}
