import { Module } from '@nestjs/common';
import { NodemailerInitModule } from '../nodemailer-init/nodemailer-init.module';
import { EmailsService } from './services/emails.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, NodemailerInitModule],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
