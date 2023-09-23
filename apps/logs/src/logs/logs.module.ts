import { Module } from '@nestjs/common';
import { LogsService } from './services/logs.service';

@Module({
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
