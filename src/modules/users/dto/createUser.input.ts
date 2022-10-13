import { InputType, Field } from '@nestjs/graphql';
import { IsEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Field(() => String, { description: 'User email ' })
  email: string;

  @Field(() => String, { description: 'User bio ', nullable: true })
  bio?: string;

  @Field(() => String, { description: 'User gender ', nullable: true })
  gender?: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;
}
