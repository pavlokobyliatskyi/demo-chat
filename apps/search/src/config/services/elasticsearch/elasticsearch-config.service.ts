import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config/dist/config.service';
import { ElasticsearchEnvs } from './envs/elasticsearch.envs';

@Injectable()
export class ElasticsearchConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<ElasticsearchEnvs>
  ) {}

  public getHost(): string {
    return this.configService.get('SEARCH_ELASTICSEARCH_HOST');
  }

  public getPort(): number {
    return Number(this.configService.get('SEARCH_ELASTICSEARCH_PORT'));
  }

  public getUser(): string {
    return this.configService.get('SEARCH_ELASTICSEARCH_USERNAME');
  }

  public getPassword(): string {
    return this.configService.get('SEARCH_ELASTICSEARCH_PASSWORD');
  }
}
