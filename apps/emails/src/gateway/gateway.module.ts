import { Module } from '@nestjs/common';
import { AuthEvents } from './events/auth.events';
import { EmailsModule } from '../emails/emails.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, EmailsModule],
  controllers: [AuthEvents],
})
export class GatewayModule {}
