import { Module } from '@nestjs/common';
import {
  MessageHandlerErrorBehavior,
  RabbitMQModule,
} from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { Members } from '@demo-chat/shared';

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
          exchanges: [Members.Exchanges.members],
          connectionInitOptions: {
            wait: true,
          },
          enableControllerDiscovery: true,
          // defaultRpcErrorBehavior: MessageHandlerErrorBehavior.NACK,
          // defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.NACK,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQInitModule {}
