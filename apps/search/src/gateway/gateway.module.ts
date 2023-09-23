import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { MessagesEvents } from './events/messages.events';
import { IndexModule } from '../index/index.module';
import { MessagesQueries } from './queries/messages.queries';
import { ChatsEvents } from './events/chats.events';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, IndexModule],
  controllers: [MessagesEvents, MessagesQueries, ChatsEvents],
})
export class GatewayModule {}
