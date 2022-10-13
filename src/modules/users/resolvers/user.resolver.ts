import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay/connection.args';
import { CreateUserInput } from '../dto/user/createUser.input';
import { ListUsersResponse } from '../dto/user/list.users.response';
import { UpdateUserInput } from '../dto/user/updateUser.input';
import { UserS } from '../dto/user/user';
import { UserService } from '../services/user.service';

@Resolver(() => UserS)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserS)
  async createUser(@Args('createUser') createUserInput: CreateUserInput) {
    return await this.userService.store(createUserInput);
  }

  @Query(() => ListUsersResponse, { name: 'listUsersWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListUsersResponse> {
    const { limit, offset } = getPagingParameters(args);
    const data = await this.userService.findAllWithPagination({
      limit,
      offset,
    });
    const users = data[0],
      count = data[1];
    const page = await connectionFromArraySlice(users, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Query(() => UserS, { name: 'user' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => UserS)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const findUser = await this.userService.findById(id);

    if (!findUser) throw new NotFoundException('User Not found!.');

    return await this.userService.update(findUser._id, updateUserInput);
  }

  //   @Mutation(() => UserS)
  //   removeUser(@Args('_id', { type: () => String }) id: string) {
  //     return this.userService.remove(id);
  //   }
}
