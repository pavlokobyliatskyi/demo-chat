import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogsService {
  private readonly logger = new Logger(LogsService.name);

  public async log(message: unknown, context?: string) {
    this.logger.log(message, context);
  }

  public async error(message: unknown, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }
}
