import { IsNumber, IsString } from 'class-validator';

export class ElasticsearchEnvs {
  @IsString()
  SEARCH_ELASTICSEARCH_HOST: string;

  @IsNumber()
  SEARCH_ELASTICSEARCH_PORT: number;

  @IsString()
  SEARCH_ELASTICSEARCH_USERNAME: string;

  @IsString()
  SEARCH_ELASTICSEARCH_PASSWORD: string;
}
