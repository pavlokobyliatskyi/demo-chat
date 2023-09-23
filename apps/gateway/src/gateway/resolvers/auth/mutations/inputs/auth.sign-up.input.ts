import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType('AuthSignUp')
export class AuthSignUpInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;
}
