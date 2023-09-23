import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as _ConfigService } from '@nestjs/config';
import { MicroserviceEnvs } from './envs/microservice.envs';

@Injectable()
export class MicroserviceConfigService {
  constructor(
    @Inject(_ConfigService)
    private readonly configService: _ConfigService<MicroserviceEnvs>
  ) {}

  public getLogsName(): string {
    return this.configService.get('FILES_LOGS_NAME');
  }
}
