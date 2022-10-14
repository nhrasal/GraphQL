import { Field, InputType } from '@nestjs/graphql';
import { InterestAdd } from './createUser.input';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Field(() => String, {
    nullable: true,
  })
  bio?: string;

  @Field((type) => [InterestAdd], { nullable: true })
  interests: Promise<InterestAdd[]>;

  @Field(() => String, {
    nullable: true,
  })
  gender?: string;
}
