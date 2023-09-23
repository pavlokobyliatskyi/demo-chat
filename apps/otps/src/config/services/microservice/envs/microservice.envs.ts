import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  OTPS_LOGS_NAME: string;
}
