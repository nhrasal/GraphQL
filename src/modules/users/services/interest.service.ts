import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { MongoRepository } from 'typeorm';
import { InterestEntity } from '../entities/interest.entity';

@Injectable()
export class InterestService extends BaseService<InterestEntity> {
  constructor(
    @InjectRepository(InterestEntity)
    private userRepo: MongoRepository<InterestEntity>,
  ) {
    super(userRepo, InterestEntity);
  }
}
