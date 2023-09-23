import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('MessagesGetMessages')
export class MessagesGetMessagesInput {
  @IsString()
  @Field()
  chatId: string;
}
