import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { BcryptHelper } from 'src/helper/bcrypt.helper';
import { MongoRepository } from 'typeorm';
import { ListUsersInput } from '../dto/user/listUsers.input';
import { UserEntity } from '../entities/user.entity';
@Injectable()
export class UserService extends BaseService<UserEntity> {
  bcryptHelper = new BcryptHelper();

  constructor(
    @InjectRepository(UserEntity)
    private userRepo: MongoRepository<UserEntity>,
  ) {
    super(userRepo, UserEntity);
  }

  async store(userRequestData: any): Promise<any> {
    const findUser = await this.findOneByEmail(userRequestData.email);

    if (findUser) throw new BadRequestException('User already exists!');

    const data = {
      ...userRequestData,
      password: await this.bcryptHelper.hashString(userRequestData.password),
    };
    return this.userRepo.save(data);
  }

  // findAll(paginationQuery: ListUsersInput): Promise<any> {
  //   const { limit, offset } = paginationQuery;
  //   return this.userRepo.findAndCount({
  //     skip: offset,
  //     take: limit,
  //   });
  // }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
      select: ['_id', 'email', 'password', 'isActive'],
    });

    return user;
  }
}
