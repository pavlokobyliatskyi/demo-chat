import { IsNumber, IsString } from 'class-validator';

export class MinioEnvs {
  @IsString()
  FILES_MINIO_USER: string;

  @IsString()
  FILES_MINIO_PASSWORD: string;

  @IsString()
  FILES_MINIO_SERVER_HOST: string;

  @IsNumber()
  FILES_MINIO_SERVER_PORT: number;

  @IsString()
  FILES_MINIO_DEFAULT_BUCKET: string;
}
