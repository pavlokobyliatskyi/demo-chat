import { ITokenService } from './interfaces/token-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService as _JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ConfigService } from '../../config/services/config.service';
import { Auth } from '@demo-chat/shared';

@Injectable()
export class RefreshTokenService implements ITokenService {
  constructor(
    @Inject(_JwtService) private jwtService: _JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  public async sign(args: Auth.ITokenPayload): Promise<string> {
    return await this.jwtService.signAsync(args, {
      secret: this.configService.jwt.getRefreshTokenSecret(),
      expiresIn: `${this.configService.jwt.getRefreshTokenExpires()}s`,
    });
  }

  public async verify(token: string): Promise<Auth.ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.getRefreshTokenSecret(),
      });
    } catch (e) {
      return null;
    }
  }
}
