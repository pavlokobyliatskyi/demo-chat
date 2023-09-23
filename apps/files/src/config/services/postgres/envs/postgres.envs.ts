import { IsNumber, IsString } from 'class-validator';

export class PostgresEnvs {
  @IsString()
  FILES_POSTGRES_HOST: string;

  @IsNumber()
  FILES_POSTGRES_PORT: number;

  @IsString()
  FILES_POSTGRES_USER: string;

  @IsString()
  FILES_POSTGRES_PASSWORD: string;

  @IsString()
  FILES_POSTGRES_DATABASE: string;
}
