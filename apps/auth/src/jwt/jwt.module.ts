import { Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { AccessTokenService } from './services/access-token.service';
import { RefreshTokenService } from './services/refresh-token.service';

@Module({
  imports: [ConfigModule, _JwtModule.register({})],
  providers: [AccessTokenService, RefreshTokenService],
  exports: [AccessTokenService, RefreshTokenService],
})
export class JwtModule {}
