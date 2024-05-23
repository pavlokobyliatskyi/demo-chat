import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { Module } from '@nestjs/common';
import { ElasticsearchModule as _ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    _ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configsService: ConfigService) => {
        const host = configsService.elasticsearch.getHost();
        const port = configsService.elasticsearch.getPort();
        const username = configsService.elasticsearch.getUser();
        const password = configsService.elasticsearch.getPassword();

        return {
          node: `http://${host}:${port}`,
          auth: {
            username,
            password,
          },
          maxRetries: 10,
          requestTimeout: 60000,
          pingTimeout: 60000,
          // sniffOnStart: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [_ElasticsearchModule],
})
export class ElasticsearchModule {}
