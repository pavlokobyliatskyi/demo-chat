import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { Logs } from '@demo-chat/shared';
import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.rabbitmq.getRabbitMQUser();
        const password = configService.rabbitmq.getRabbitMQPassword();
        const host = configService.rabbitmq.getRabbitMQHost();
        const port = configService.rabbitmq.getRabbitMQPort();

        return {
          uri: `amqp://${user}:${password}@${host}:${port}`,
          exchanges: [Logs.Exchanges.logs],
          connectionInitOptions: {
            wait: true,
          },
          enableControllerDiscovery: true,
          // defaultRpcErrorBehavior: MessageHandlerErrorBehavior.NACK,
          // defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.NACK,
          prefetchCount: 42,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQInitModule {}
