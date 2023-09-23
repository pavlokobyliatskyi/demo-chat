import { IsNumber, IsString } from 'class-validator';

export class MongoDBEnvs {
  @IsString()
  CHATS_MONGO_HOST: string;

  @IsNumber()
  CHATS_MONGO_PORT: number;

  @IsString()
  CHATS_MONGO_USER: string;

  @IsString()
  CHATS_MONGO_PASSWORD: string;

  @IsString()
  CHATS_MONGO_DATABASE: string;

  @IsString()
  CHATS_MONGO_AUTH_SOURCE: string;
}
