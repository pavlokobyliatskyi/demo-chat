import { Module } from '@nestjs/common';
import { LogsCommands } from './commands/logs.commands';
import { LogsModule } from '../logs/logs.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, LogsModule],
  controllers: [LogsCommands],
})
export class GatewayModule {}
