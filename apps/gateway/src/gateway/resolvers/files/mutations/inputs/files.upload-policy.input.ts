import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsMimeType, IsString } from 'class-validator';

@InputType('FilesUploadPolicy')
export class FilesUploadPolicyInput {
  @IsString()
  @Field({ description: 'The file name must have an extension.' })
  name: string;

  @IsInt()
  @Field()
  size: number;

  @IsMimeType()
  @Field()
  type: string;
}
