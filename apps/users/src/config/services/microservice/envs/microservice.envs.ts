import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  USERS_LOGS_NAME: string;
}
