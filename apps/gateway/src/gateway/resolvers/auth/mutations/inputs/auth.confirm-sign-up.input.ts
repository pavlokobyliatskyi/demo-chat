import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType('AuthConfirmSignUp')
export class AuthConfirmSignUpInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Length(6, 6)
  @Field()
  code: string;
}
