import { IsNumber, IsString } from 'class-validator';

export class MongoDBEnvs {
  @IsString()
  USERS_MONGO_HOST: string;

  @IsNumber()
  USERS_MONGO_PORT: number;

  @IsString()
  USERS_MONGO_USER: string;

  @IsString()
  USERS_MONGO_PASSWORD: string;

  @IsString()
  USERS_MONGO_DATABASE: string;

  @IsString()
  USERS_MONGO_AUTH_SOURCE: string;
}
