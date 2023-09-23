import { IsNumber, IsString } from 'class-validator';

export class JwtEnvs {
  @IsString()
  AUTH_JWT_ACCESS_TOKEN_SECRET: string;

  @IsNumber()
  AUTH_JWT_ACCESS_TOKEN_EXPIRES: number;

  @IsString()
  AUTH_JWT_REFRESH_TOKEN_SECRET: string;

  @IsNumber()
  AUTH_JWT_REFRESH_TOKEN_EXPIRES: number;
}
