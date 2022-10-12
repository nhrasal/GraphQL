import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay/connection.args';
import { CreateUserInput } from './dto/createUser.input';
import { ListUsersResponse } from './dto/list.users.response';
import { ListUsersInput } from './dto/listUsers.input';
import { UserS } from './dto/user';
import { UserService } from './user.service';

@Resolver(() => UserS)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => UserS)
  async createUser(@Args('createUser') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => ListUsersResponse, { name: 'listUsersWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListUsersResponse> {
    const { limit, offset } = getPagingParameters(args);
    const data = await this.usersService.findAll({
      limit,
      offset,
    });
    const users = data[0],
      count = data[1];
    const page = connectionFromArraySlice(users, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  //   @Query(() => UserS, { name: 'user' })
  //   findOne(@Args('_id', { type: () => String }) id: string) {
  //     return this.usersService.findOne(id);
  //   }

  //   @Mutation(() => UserS)
  //   updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //     return this.usersService.update(updateUserInput._id, updateUserInput);
  //   }

  //   @Mutation(() => UserS)
  //   removeUser(@Args('_id', { type: () => String }) id: string) {
  //     return this.usersService.remove(id);
  //   }
}
