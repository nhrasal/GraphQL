/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UserService } from './services/user.service';
import { InterestEntity } from './entities/interest.entity';
import { UserResolver } from './resolvers/user.resolver';
import { InterestService } from './services/interest.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, InterestEntity])],

  providers: [UserResolver, UserService, InterestService],
  exports: [UserService],
})
export class UserModule {}
