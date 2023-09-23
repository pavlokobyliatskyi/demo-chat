import { Controller, Inject, Logger } from '@nestjs/common';
import { OtpsService } from '../../opts/services/otps.service';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Otps } from '@demo-chat/shared';

@Controller()
export class OptsCommands {
  private readonly logger = new Logger(OptsCommands.name);

  constructor(@Inject(OtpsService) private readonly otpsService: OtpsService) {}

  @RabbitRPC({
    exchange: Otps.OtpsGenerateCommandContract.exchange.otps.name,
    routingKey: Otps.OtpsGenerateCommandContract.routing.generate.name,
    queue: Otps.OtpsGenerateCommandContract.queue.otps.name,
    queueOptions: Otps.OtpsGenerateCommandContract.queue.otps.options,
  })
  public async generate(
    @RabbitPayload() args: Otps.OtpsGenerateCommandContract.Request
  ): Promise<Otps.OtpsGenerateCommandContract.Response> {
    this.logger.log(`Generate otp code ${JSON.stringify(args)}`);

    const code = await this.otpsService.generate(args.key);

    return {
      code,
    };
  }

  @RabbitRPC({
    exchange: Otps.OtpsVerifyCommandContract.exchange.otps.name,
    routingKey: Otps.OtpsVerifyCommandContract.routing.verify.name,
    queue: Otps.OtpsVerifyCommandContract.queue.otps.name,
    queueOptions: Otps.OtpsVerifyCommandContract.queue.otps.options,
  })
  public async verify(
    @RabbitPayload() args: Otps.OtpsVerifyCommandContract.Request
  ): Promise<Otps.OtpsVerifyCommandContract.Response> {
    this.logger.log(`Verify otp code ${JSON.stringify(args)}`);

    return await this.otpsService.verify(args.key, args.code);
  }
}
