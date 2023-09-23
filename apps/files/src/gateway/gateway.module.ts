import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { MinioModule } from '../minio/minio.module';
import { RabbitMQInitModule } from '../rabbitmq-init/rabbitmq-init.module';
import { LoggerModule } from '../logger/logger.module';
import { FilesQueries } from './queries/files.queries';
import { MineTypesModule } from '../mine-types/mine-types.module';

@Module({
  imports: [
    RabbitMQInitModule,
    LoggerModule,
    FilesModule,
    MinioModule,
    MineTypesModule,
  ],
  controllers: [FilesQueries],
})
export class GatewayModule {}
