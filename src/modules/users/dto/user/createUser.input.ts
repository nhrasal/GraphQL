import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectID } from 'typeorm';

type male = 'male';
type Female = 'female';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

@InputType()
export class InterestAdd {
  @Field(() => String, { defaultValue: '' })
  _id: ObjectID;

  @Field(() => String, { defaultValue: '' })
  name: string;
}

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User firstName ' })
  @IsNotEmpty()
  firstName: string;

  @Field(() => String, { description: 'User lastName ' })
  @IsNotEmpty()
  lastName: string;

  @Field(() => String, { description: 'User email ' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, {
    description: 'User bio',
    nullable: true,
    defaultValue: '',
  })
  bio?: string;

  @Field((type) => [InterestAdd], { nullable: true, defaultValue: [] })
  interests: Promise<InterestAdd[]>;

  @Field(() => String, {
    nullable: true,
    defaultValue: '',
  })
  gender?: string;

  @Field(() => String, { description: 'password of the user' })
  @IsNotEmpty()
  password: string;
}
