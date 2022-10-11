import { ObjectType, Field } from '@nestjs/graphql';
import { now, Schema as MongooseSchema } from 'mongoose';
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
  // @Field(() => String, { description: 'User Password ' })
  password: string;

  @Prop()
  @Field(() => String, { description: 'User role' })
  role: string;

  @Prop({ default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Prop({ default: now() })
  @Field(() => Date)
  createdAt: Date;

  @Prop({ default: now() })
  @Field(() => Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
