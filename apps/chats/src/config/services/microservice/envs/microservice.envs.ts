import { IsString } from 'class-validator';

export class MicroserviceEnvs {
  @IsString()
  CHATS_LOGS_NAME: string;
}
