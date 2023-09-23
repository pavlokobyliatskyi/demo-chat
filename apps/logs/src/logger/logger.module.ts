import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule as _LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    RabbitMQInitModule,
    _LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
