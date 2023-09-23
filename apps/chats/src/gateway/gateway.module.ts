import { Module } from '@nestjs/common';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';
import { ChatsModule } from '../chats/chats.module';
import { ChatsQueries } from './queries/chats.queries';
import { AuthEvents } from './events/auth.events';
import { MembersEvents } from './events/members.events';

@Module({
  imports: [RabbitMQInitModule, LoggerModule, ChatsModule],
  controllers: [ChatsQueries, AuthEvents, MembersEvents],
})
export class GatewayModule {}
