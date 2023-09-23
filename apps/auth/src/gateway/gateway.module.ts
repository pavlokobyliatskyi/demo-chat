import { Module } from '@nestjs/common';
import { AuthCommands } from './commands/auth.commands';
import { ConfigModule } from '../config/config.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [LoggerModule, RabbitMQInitModule, ConfigModule, JwtModule],
  controllers: [AuthCommands],
})
export class GatewayModule {}
