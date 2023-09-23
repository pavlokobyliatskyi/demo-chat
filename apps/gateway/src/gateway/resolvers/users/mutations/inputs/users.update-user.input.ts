import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType('UpdateUser')
export class UsersUpdateUserInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsUUID('4')
  @Field({ nullable: true })
  pictureFileId: string;
}
