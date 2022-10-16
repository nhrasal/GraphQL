import { Field, ObjectType } from '@nestjs/graphql';
import { UserS } from 'src/modules/users/dto/user/user';

@ObjectType()
export class LoginResponse {
  @Field(() => String, { description: 'password of the user' })
  accessToken: string;

  @Field(() => String, { description: 'password of the user' })
  refreshToken: string;

  @Field(() => UserS, { nullable: true })
  public user!: UserS;
}
