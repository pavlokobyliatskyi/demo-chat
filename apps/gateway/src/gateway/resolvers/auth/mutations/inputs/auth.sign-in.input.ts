import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType('AuthSignIn')
export class AuthSignInInput {
  @IsEmail()
  @Field()
  email: string;
}
