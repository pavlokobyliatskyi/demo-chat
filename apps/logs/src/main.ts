import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { LoggerService } from './logger/services/logger.service';

const main = async () => {
  const app = await NestFactory.create(GatewayModule, {
    bufferLogs: true,
  });

  app.enableShutdownHooks();

  app.useLogger(app.get(LoggerService));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.flushLogs();

  await app.init();

  Logger.log(`🚀 Logs is running`);
};

main();
