import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadExceptionFilter.name);

  catch(exception: BadRequestException) {
    this.logger.error(JSON.stringify(exception.getResponse()));
    return exception.getResponse();
  }
}
