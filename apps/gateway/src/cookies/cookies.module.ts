import { Module } from '@nestjs/common';
import { CookiesService } from './services/cookies.service';

@Module({
  providers: [CookiesService],
  exports: [CookiesService],
})
export class CookiesModule {}
