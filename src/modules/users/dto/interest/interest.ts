import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';

@ObjectType()
export class Interest {
  @Field(() => String)
  _id: ObjectID;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
