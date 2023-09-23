import { IsIn, IsNumber, IsString } from 'class-validator';

export class EmailEnvs {
  @IsString()
  EMAILS_EMAIL_HOST: string;

  @IsString()
  EMAILS_EMAIL_USER: string;

  @IsString()
  EMAILS_EMAIL_PASSWORD: string;

  @IsNumber()
  EMAILS_EMAIL_PORT: number;

  @IsString()
  @IsIn(['false', 'true'])
  EMAILS_EMAIL_USE_TLS: string;

  @IsString()
  EMAILS_EMAIL_ADDRESS: string;
}
