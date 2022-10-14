import { Field, ObjectType } from '@nestjs/graphql';
import { PageDataDto } from 'src/common/dto/page-data.dto';
import { UserS } from './user';

@ObjectType()
export class UserResponse {
  @Field(() => [UserS], { defaultValue: [] })
  users: UserS[];

  @Field(() => PageDataDto)
  pageData: PageDataDto;
}
