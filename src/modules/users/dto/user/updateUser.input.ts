import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { InterestAdd } from './createUser.input';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'first name of the user' })
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  @IsNotEmpty()
  lastName: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsNotEmpty()
  bio?: string;

  @Field((type) => [InterestAdd], { nullable: true })
  @IsNotEmpty()
  interests: Promise<InterestAdd[]>;

  @Field(() => String, {
    nullable: true,
  })
  @IsNotEmpty()
  gender?: string;
}
