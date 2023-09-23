import { Module } from '@nestjs/common';
import { MembersCommands } from './commands/members.commands';
import { MembersQueries } from './queries/members.queries';
import { MembersModule } from '../members/members.module';
import { LoggerModule } from '../logger/logger.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { ChatsEvents } from './events/chats.events';

@Module({
  imports: [RabbitMQInitModule, LoggerModule, MembersModule],
  controllers: [MembersCommands, MembersQueries, ChatsEvents],
})
export class GatewayModule {}
