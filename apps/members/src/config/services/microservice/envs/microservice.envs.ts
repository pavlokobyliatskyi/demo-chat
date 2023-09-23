import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  MEMBERS_LOGS_NAME: string;
}
