import { Logger, ValidationPipe } from '@nestjs/common';

import { BadExceptionFilter } from './exceptions/bad-exception.filter';
import { GatewayModule } from './gateway/gateway.module';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { LoggerService } from './logger/services/logger.service';
import { NestFactory } from '@nestjs/core';

const main = async () => {
  const app = await NestFactory.create(GatewayModule, {
    bufferLogs: true,
    logger: false,
  });

  app.enableShutdownHooks();

  app.useLogger(app.get(LoggerService));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.flushLogs();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.useGlobalFilters(new BadExceptionFilter());

  await app.init();

  Logger.log(`🚀 Auth is running`);
};

main();
