import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  MESSAGES_LOGS_NAME: string;
}
