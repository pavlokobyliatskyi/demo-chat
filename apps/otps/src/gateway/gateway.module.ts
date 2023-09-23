import { Module } from '@nestjs/common';
import { OptsModule } from '../opts/opts.module';
import { OptsCommands } from './commands/opts.commands';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, OptsModule],
  controllers: [OptsCommands],
})
export class GatewayModule {}
