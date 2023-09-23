import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { LoggerService } from './logger/services/logger.service';
import cookieParser from 'cookie-parser';

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

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.enableCors();

  app.use(cookieParser());

  const port = 3333;

  await app.listen(port);

  Logger.log(`🚀 Gateway is running on: http://localhost:${port}`);
};

main();
