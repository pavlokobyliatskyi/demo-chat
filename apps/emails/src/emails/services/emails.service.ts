import { Inject, Injectable } from '@nestjs/common';
import { NODEMAILER_SERVICE } from '../../nodemailer-init/nodemailer-init.module';
import { Transporter } from 'nodemailer';
import { ConfigService } from '../../config/services/config.service';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailsService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(NODEMAILER_SERVICE) private readonly nodemailerService: Transporter
  ) {}

  public async sendEmail(args: Omit<Mail.Options, 'from'>) {
    const from = this.configService.email.getEmailAddress();

    return await this.nodemailerService.sendMail({
      from,
      ...args,
    });
  }
}
