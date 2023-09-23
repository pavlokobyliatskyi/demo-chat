import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  AUTH_LOGS_NAME: string;
}
