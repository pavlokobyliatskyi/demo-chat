import { Module } from '@nestjs/common';
import { MessagesCommands } from './commands/messages.commands';
import { MessagesQueries } from './queries/messages.queries';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [RabbitMQInitModule, LoggerModule, MessagesModule],
  controllers: [MessagesCommands, MessagesQueries],
})
export class GatewayModule {}
