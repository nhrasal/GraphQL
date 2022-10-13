import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
@ObjectType()
export class UserS {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Field(() => String, { description: 'User email ' })
  email: string;

  @Field(() => String, { description: 'User Bio ' })
  bio: string;

  @Field(() => String, { description: 'User Gender ' })
  gender: string;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserS);
