import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class BadExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadExceptionFilter.name);

  catch(exception: BadRequestException) {
    this.logger.error(JSON.stringify(exception.getResponse()));
    return exception.getResponse();
  }
}
