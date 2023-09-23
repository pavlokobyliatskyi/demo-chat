import { Module } from '@nestjs/common';
import { RedisInitModule } from '../redis-init/redis-init.module';
import { OtpsService } from './services/otps.service';
import { CodeModule } from '../code/code.module';

@Module({
  imports: [RedisInitModule, CodeModule],
  providers: [OtpsService],
  exports: [OtpsService],
})
export class OptsModule {}
