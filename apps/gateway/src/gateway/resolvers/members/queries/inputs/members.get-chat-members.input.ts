import { Field, InputType } from '@nestjs/graphql';

@InputType('MembersGetChatMembers')
export class MembersGetChatMembersInput {
  @Field()
  chatId: string;
}
