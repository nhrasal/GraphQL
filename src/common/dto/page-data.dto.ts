import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageDataDto {
  @Field()
  public total: number;

  @Field()
  public limit: number;

  @Field()
  public offset: number;
}
