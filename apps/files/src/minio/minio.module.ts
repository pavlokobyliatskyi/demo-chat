import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { MinioService } from './services/minio.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule implements OnModuleInit {
  constructor(
    @Inject(MinioService) private readonly minioService: MinioService
  ) {}

  public async onModuleInit() {
    // Create a buket if it does not exist
    await this.minioService.makeBucket();
  }
}
