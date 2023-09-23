import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  GATEWAY_LOGS_NAME: string;
}
