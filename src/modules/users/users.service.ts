import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListUsersInput } from './dto/list-users.input';
import { BcryptHelper } from 'src/helper/bcrypt.helper';

@Injectable()
export class UsersService {
  bcryptHelper = new BcryptHelper();

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const data = {
      ...createUserInput,
      password: await this.bcryptHelper.hashString(createUserInput.password),
    };
    const user = new this.userModel(data);
    return await user.save();
  }

  findAll(paginationQuery: ListUsersInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  async getUsers(paginationQuery: ListUsersInput) {
    const count = await this.userModel.count();
    const users = await this.findAll(paginationQuery);
    return { users, count };
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();

    return user;
  }
}
