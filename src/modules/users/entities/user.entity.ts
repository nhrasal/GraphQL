import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Prop()
  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Prop()
  @Field(() => String, { description: 'User email ' })
  email: string;

  @Prop()
  @Field(() => String, { description: 'User Password ' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User role' })
  role: string;

  @Prop()
  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @Prop()
  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @Prop()
  @Field(() => Date, { defaultValue: new Date() })
  updatedAt: Date;

  @Prop()
  @Field(() => Date, { defaultValue: new Date() })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
