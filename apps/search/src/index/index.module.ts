import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { MessagesIndexService } from './services/messages-index.service';

@Module({
  imports: [ElasticsearchModule],
  providers: [MessagesIndexService],
  exports: [MessagesIndexService],
})
export class IndexModule {}
