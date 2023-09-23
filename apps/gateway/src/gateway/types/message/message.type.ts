import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';
import { ChatType } from '../chat/chat.type';
import { UserType } from '../user/user.type';

@ObjectType('Message')
export class MessageType {
  @Field()
  _id: string;

  @Field(() => ChatType)
  chat: ChatType;

  @Field(() => UserType)
  user: UserType;

  @Field()
  text: string;

  @Field(() => GraphQLDateTime)
  createdAt: Date;
}
