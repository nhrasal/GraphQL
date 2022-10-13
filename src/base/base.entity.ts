import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
