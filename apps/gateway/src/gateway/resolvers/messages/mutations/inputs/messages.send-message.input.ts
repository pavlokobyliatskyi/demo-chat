import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('MessagesSendMessage')
export class MessagesSendMessageInput {
  @IsString()
  @Field()
  chatId: string;

  @IsString()
  @Field()
  text: string;
}
