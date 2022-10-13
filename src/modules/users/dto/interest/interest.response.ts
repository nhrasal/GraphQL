import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from 'src/common/relay/relay.types';
import { Interest } from './interest';

@ObjectType()
export class ListInterestResponse extends RelayTypes<Interest>(Interest) {}
