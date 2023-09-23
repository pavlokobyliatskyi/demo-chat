import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { MongoDBEnvs } from './envs/mongodb.envs';

@Injectable()
export class MongoDBConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<MongoDBEnvs>
  ) {}

  public getHost(): string {
    return this.configService.get('CHATS_MONGO_HOST');
  }

  public getPort(): number {
    return Number(this.configService.get('CHATS_MONGO_PORT'));
  }

  public getUser(): string {
    return this.configService.get('CHATS_MONGO_USER');
  }

  public getPassword(): string {
    return this.configService.get('CHATS_MONGO_PASSWORD');
  }

  public getDatabase(): string {
    return this.configService.get('CHATS_MONGO_DATABASE');
  }

  public getAuthSource(): string {
    return this.configService.get('CHATS_MONGO_AUTH_SOURCE');
  }
}
