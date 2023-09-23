import { IsNumber, IsString } from 'class-validator';

export class MongoDBEnvs {
  @IsString()
  MESSAGES_MONGO_HOST: string;

  @IsNumber()
  MESSAGES_MONGO_PORT: number;

  @IsString()
  MESSAGES_MONGO_USER: string;

  @IsString()
  MESSAGES_MONGO_PASSWORD: string;

  @IsString()
  MESSAGES_MONGO_DATABASE: string;

  @IsString()
  MESSAGES_MONGO_AUTH_SOURCE: string;
}
