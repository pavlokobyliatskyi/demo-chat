import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  isEmailVerified: boolean;

  @Field()
  name: string;

  @Field({
    nullable: true,
  })
  pictureUrl: string;
}
