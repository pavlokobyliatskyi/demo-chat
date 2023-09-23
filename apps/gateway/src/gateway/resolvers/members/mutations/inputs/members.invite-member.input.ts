import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType('MembersInviteMember')
export class MembersInviteMemberInput {
  @Field()
  chatId: string;

  @IsEmail()
  @Field()
  email: string;
}
