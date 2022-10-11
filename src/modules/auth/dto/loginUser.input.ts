import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
