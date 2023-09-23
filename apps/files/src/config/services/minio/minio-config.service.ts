import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { MinioEnvs } from './envs/minio.envs';

@Injectable()
export class MinioConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<MinioEnvs>
  ) {}

  public getUser(): string {
    return this.configService.get('FILES_MINIO_USER');
  }

  public getPassword(): string {
    return this.configService.get('FILES_MINIO_PASSWORD');
  }

  public getHost(): string {
    return this.configService.get('FILES_MINIO_SERVER_HOST');
  }

  public getPort(): number {
    return Number(this.configService.get('FILES_MINIO_SERVER_PORT'));
  }

  public getDefaultBucket(): string {
    return this.configService.get('FILES_MINIO_DEFAULT_BUCKET');
  }
}
