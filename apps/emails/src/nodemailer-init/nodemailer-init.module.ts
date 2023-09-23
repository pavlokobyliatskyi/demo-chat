import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import nodemailer from 'nodemailer';

export const NODEMAILER_SERVICE = Symbol('NODEMAILER_SERVICE');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: NODEMAILER_SERVICE,
      useFactory: async (configService: ConfigService) => {
        const host = configService.email.getEmailHost();
        const port = configService.email.getEmailPort();
        const secure = configService.email.getIsEmailUseTls();
        const user = configService.email.getEmailUser();
        const pass = configService.email.getEmailPassword();

        return nodemailer.createTransport({
          host,
          port,
          secure,
          auth: {
            user,
            pass,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [NODEMAILER_SERVICE],
})
export class NodemailerInitModule {}
