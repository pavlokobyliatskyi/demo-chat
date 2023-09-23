import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.mongodb.getUser();
        const password = configService.mongodb.getPassword();
        const host = configService.mongodb.getHost();
        const port = configService.mongodb.getPort();
        const database = configService.mongodb.getDatabase();
        const authSource = configService.mongodb.getAuthSource();

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=${authSource}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseInitModule {}
