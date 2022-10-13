import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/relay/connection.args';
import { CreateInterestInput } from '../dto/interest/createInterest.input';
import { Interest } from '../dto/interest/interest';
import { ListInterestResponse } from '../dto/interest/interest.response';
import { InterestService } from '../services/interest.service';

@Resolver(() => Interest)
export class InterestResolver {
  constructor(private readonly service: InterestService) {}

  @Mutation(() => Interest)
  async createInterest(
    @Args('createInterest') createInterestInput: CreateInterestInput,
  ) {
    return await this.service.store(createInterestInput);
  }

  @Query(() => ListInterestResponse, { name: 'listInterest' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListInterestResponse> {
    const { limit, offset } = getPagingParameters(args);
    const data = await this.service.findAllWithPagination({
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

  @Query(() => Interest, { name: 'interest' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.service.findById(id);
  }

  @Mutation(() => Interest)
  async update(
    @Args('updateInterest') updateInterestInput: CreateInterestInput,
  ) {
    const findUser = await this.service.findById(updateInterestInput._id);
    await delete updateInterestInput._id;
    return await this.service.update(findUser._id, updateInterestInput);
  }
}
