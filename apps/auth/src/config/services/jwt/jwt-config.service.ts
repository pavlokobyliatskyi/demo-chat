import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { JwtEnvs } from './envs/jwt.envs';

@Injectable()
export class JwtConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<JwtEnvs>
  ) {}

  public getAccessTokenSecret(): string {
    return this.configService.get('AUTH_JWT_ACCESS_TOKEN_SECRET');
  }

  public getAccessTokenExpires(): number {
    return Number(this.configService.get('AUTH_JWT_ACCESS_TOKEN_EXPIRES'));
  }

  public getRefreshTokenSecret(): string {
    return this.configService.get('AUTH_JWT_REFRESH_TOKEN_SECRET');
  }

  public getRefreshTokenExpires(): number {
    return Number(this.configService.get('AUTH_JWT_REFRESH_TOKEN_EXPIRES'));
  }
}
