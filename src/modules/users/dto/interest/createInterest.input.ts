import { Field, InputType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
@InputType()
export class CreateInterestInput {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;
}

export const InterestSchema = SchemaFactory.createForClass(CreateInterestInput);
