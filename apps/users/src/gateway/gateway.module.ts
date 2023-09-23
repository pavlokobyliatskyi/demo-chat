import { Module } from '@nestjs/common';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { UsersCommands } from './commands/users.commands';
import { UsersModule } from '../users/users.module';
import { UsersQueries } from './queries/users.queries';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, UsersModule],
  controllers: [UsersCommands, UsersQueries],
})
export class GatewayModule {}
