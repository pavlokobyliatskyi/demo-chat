import { Controller, Inject } from '@nestjs/common';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { LogsService } from '../../logs/services/logs.service';
import { Logs } from '@demo-chat/shared';

@Controller()
export class LogLogsCommands {
  constructor(@Inject(LogsService) private readonly logsService: LogsService) {}

  @RabbitRPC({
    exchange: Logs.LogsLogEventContract.exchange.logs.name,
    routingKey: Logs.LogsLogEventContract.routing.logEvent.name,
    queue: Logs.LogsLogEventContract.queue.logs.name,
    queueOptions: Logs.LogsLogEventContract.queue.logs.options,
  })
  public async log(@RabbitPayload() args: Logs.LogsLogEventContract.Request) {
    await this.logsService.log(args.message, args.context);
  }

  @RabbitRPC({
    exchange: Logs.LogsErrorEventContract.exchange.logs.name,
    routingKey: Logs.LogsErrorEventContract.routing.errorEvent.name,
    queue: Logs.LogsErrorEventContract.queue.logs.name,
    queueOptions: Logs.LogsErrorEventContract.queue.logs.options,
  })
  public async error(
    @RabbitPayload() args: Logs.LogsErrorEventContract.Request
  ) {
    await this.logsService.error(args.message, args.trace, args.context);
  }
}
