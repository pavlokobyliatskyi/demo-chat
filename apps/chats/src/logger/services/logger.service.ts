import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PinoLogger } from 'nestjs-pino';
import { Logs } from '@demo-chat/shared';
import { ConfigService } from '../../config/services/config.service';

@Injectable()
export class LoggerService {
  private readonly microserviceName: string;

  constructor(
    @Inject(PinoLogger) private readonly logger: PinoLogger,
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
    this.microserviceName = this.configService.microservice.getLogsName();
  }

  public log(message: unknown, context?: string) {
    // this.logger.info(this.formatter(message, context));

    this.amqpConnection.publish<Logs.LogsLogEventContract.Request>(
      Logs.LogsLogEventContract.exchange.logs.name,
      Logs.LogsLogEventContract.routing.logEvent.name,
      {
        message,
        context: context
          ? `[ ${this.microserviceName} ] [ ${context} ]`
          : `[ ${this.microserviceName} ]`,
      }
    );
  }

  public error(message: unknown, trace?: string, context?: string) {
    // this.logger.error(this.formatter(message, context));
    // if (trace) {
    //   this.logger.error(trace);
    // }

    this.amqpConnection.publish<Logs.LogsErrorEventContract.Request>(
      Logs.LogsErrorEventContract.exchange.logs.name,
      Logs.LogsErrorEventContract.routing.errorEvent.name,
      {
        message,
        trace,
        context: `[ ${this.microserviceName} ] [ ${context} ]`,
      }
    );
  }

  // private formatter(message: unknown, context?: string) {
  //   return context ? `[ ${context} ] ${message}` : message;
  // }
}
