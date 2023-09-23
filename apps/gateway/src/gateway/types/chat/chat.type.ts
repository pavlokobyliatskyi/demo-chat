import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../user/user.type';

@ObjectType('Chat')
export class ChatType {
  @Field()
  _id: string;

  @Field()
  tmc: number;

  @Field(() => UserType)
  user: UserType;
}
