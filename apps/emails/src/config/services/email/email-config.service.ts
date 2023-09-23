import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { EmailEnvs } from './envs/email.envs';

@Injectable()
export class EmailConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<EmailEnvs>
  ) {}

  public getEmailAddress(): string {
    return this.configService.get('EMAILS_EMAIL_ADDRESS');
  }

  public getEmailHost(): string {
    return this.configService.get('EMAILS_EMAIL_HOST');
  }

  public getEmailUser(): string {
    return this.configService.get('EMAILS_EMAIL_USER');
  }

  public getEmailPassword(): string {
    return this.configService.get('EMAILS_EMAIL_PASSWORD');
  }

  public getEmailPort(): number {
    return Number(this.configService.get('EMAILS_EMAIL_PORT'));
  }

  public getIsEmailUseTls(): boolean {
    return /true/i.test(this.configService.get('EMAILS_EMAIL_USE_TLS'));
  }
}
