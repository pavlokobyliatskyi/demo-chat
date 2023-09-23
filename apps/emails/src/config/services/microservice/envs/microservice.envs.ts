import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  EMAILS_LOGS_NAME: string;
}
