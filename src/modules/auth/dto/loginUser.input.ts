import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
@InputType()
export class LoginInput {
  @Field(() => String, { description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'password of the user' })
  @IsNotEmpty()
  password: string;
}
