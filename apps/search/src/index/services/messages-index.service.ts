import { Messages } from '@demo-chat/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class MessagesIndexService {
  constructor(
    @Inject(ElasticsearchService)
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  public async createIndex(index: string) {
    const checkIndex = await this.elasticsearchService.indices.exists({
      index,
    });

    if (!checkIndex) {
      await this.elasticsearchService.indices.create({
        index,
        settings: {
          index: {
            max_ngram_diff: 30,
          },
          analysis: {
            tokenizer: {
              ngram_tokenizer: {
                type: 'ngram',
                min_gram: 1,
                max_gram: 30,
                token_chars: ['letter', 'digit', 'whitespace'],
              },
            },
            analyzer: {
              ngram_analyzer: {
                tokenizer: 'ngram_tokenizer',
                type: 'custom',
                filter: ['lowercase'],
              },
            },
          },
        },
        mappings: {
          properties: {
            text: {
              type: 'text',
              term_vector: 'yes',
              analyzer: 'ngram_analyzer',
            },
            createdAt: {
              type: 'date',
            },
          },
        },
      });
    }
  }

  public async addData(
    index: string,
    args: Pick<Messages.IMessage, '_id' | 'createdAt' | 'text'>
  ) {
    await this.elasticsearchService.index<
      Pick<Messages.IMessage, 'text' | 'createdAt'>
    >({
      index,
      id: args._id,
      document: {
        text: args.text,
        createdAt: args.createdAt,
      },
    });
  }

  public async search(index: string, query: string, from = 0, size = 100) {
    const { hits } = await this.elasticsearchService.search<
      Pick<Messages.IMessage, '_id' | 'chatId' | 'text' | 'createdAt'>
    >({
      index,
      from,
      size,
      sort: {
        createdAt: {
          order: 'desc',
        },
      },
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: `*${query}*`,
                fields: ['text'],
              },
            },
          ],
        },
      },
    });

    return hits.hits.map(({ _id, _source, _index }) => ({
      _id,
      chatId: _index,
      ..._source,
    }));
  }
}
