import { ITokenService } from './interfaces/token-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService as _JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ConfigService } from '../../config/services/config.service';
import { Auth } from '@demo-chat/shared';

@Injectable()
export class AccessTokenService implements ITokenService {
  constructor(
    @Inject(_JwtService) private jwtService: _JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  public async sign(args: Auth.ITokenPayload): Promise<string> {
    return await this.jwtService.signAsync(args, {
      secret: this.configService.jwt.getAccessTokenSecret(),
      expiresIn: `${this.configService.jwt.getAccessTokenExpires()}s`,
    });
  }

  public async verify(token: string): Promise<Auth.ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.getAccessTokenSecret(),
      });
    } catch (e) {
      return null;
    }
  }
}
