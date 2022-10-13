/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { Scope } from 'typeorm-scope';

@Scope<InterestEntity>([
  (qb, alias) => qb.andWhere(`${alias}.deletedAt IS NULL`),
])
@Entity('interests')
export class InterestEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  constructor() {
    super();
  }
}
