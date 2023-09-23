import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Token')
export class TokenType {
  @Field()
  accessToken: string;
}
