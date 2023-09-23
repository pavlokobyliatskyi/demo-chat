import { IsNumber, IsString } from 'class-validator';

export class MongoDBEnvs {
  @IsString()
  MEMBERS_MONGO_HOST: string;

  @IsNumber()
  MEMBERS_MONGO_PORT: number;

  @IsString()
  MEMBERS_MONGO_USER: string;

  @IsString()
  MEMBERS_MONGO_PASSWORD: string;

  @IsString()
  MEMBERS_MONGO_DATABASE: string;

  @IsString()
  MEMBERS_MONGO_AUTH_SOURCE: string;
}
