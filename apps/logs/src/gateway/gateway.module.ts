import { LogLogsCommands } from './commands/logs.commands';
import { LoggerModule } from '../logger/logger.module';
import { LogsModule } from '../logs/logs.module';
import { Module } from '@nestjs/common';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, LogsModule],
  controllers: [LogLogsCommands],
})
export class GatewayModule {}
