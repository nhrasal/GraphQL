import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/relay/relay.types';
import { UserS } from './user';

@ObjectType()
export class ListUsersResponse extends RelayTypes<UserS>(UserS) {}
