import { Module } from '@nestjs/common';
import { CodeService } from './services/code.service';

@Module({
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
