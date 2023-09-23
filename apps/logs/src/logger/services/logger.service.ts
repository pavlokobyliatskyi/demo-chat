import { Inject, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService {
  constructor(@Inject(PinoLogger) private readonly logger: PinoLogger) {}

  public log(message: unknown, context?: string) {
    this.logger.info(this.formatter(message, context));
  }

  public error(message: unknown, trace?: string, context?: string) {
    this.logger.error(this.formatter(message, context));
    if (trace) {
      this.logger.error(trace);
    }
  }

  private formatter(message: unknown, context?: string) {
    return context ? `${context} ${message}` : message;
  }
}
