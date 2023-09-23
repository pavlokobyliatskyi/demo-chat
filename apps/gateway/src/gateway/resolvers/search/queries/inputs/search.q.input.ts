import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType('SearchQ')
export class SearchQInput {
  @Length(1, 30)
  @IsString()
  @Field()
  query: string;
}
