/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { Scope } from 'typeorm-scope';

@Scope<UserEntity>([(qb, alias) => qb.andWhere(`${alias}.deletedAt IS NULL`)])
@Entity('user')
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
  userType: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  image: string;

  constructor(user: Partial<UserEntity>) {
    super();
    if (user) {
      this.isActive = this.isActive === undefined ? true : this.isActive;
    }
  }
}
