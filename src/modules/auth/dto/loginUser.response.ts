import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

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
