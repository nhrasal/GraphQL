import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => String, { description: 'password of the user' })
  accessToken: string;

  @Field(() => String, { description: 'password of the user' })
  refreshToken: string;

  //   @Field(() => User, { nullable: true })
  //   public user!: User;
}
