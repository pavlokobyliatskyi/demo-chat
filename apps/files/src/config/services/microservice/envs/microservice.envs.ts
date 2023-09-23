import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  FILES_LOGS_NAME: string;
}
