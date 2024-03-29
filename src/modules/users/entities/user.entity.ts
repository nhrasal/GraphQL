/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { Scope } from 'typeorm-scope';
import { InterestEntity } from './interest.entity';

@Scope<UserEntity>([(qb, alias) => qb.andWhere(`${alias}.deletedAt IS NULL`)])
@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  bio: string;

  @Column(() => InterestEntity)
  interests: InterestEntity[];

  @Column({ nullable: true })
  userType: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  image: string;
}
