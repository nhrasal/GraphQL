/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BaseLogger } from './@logger/Base.logger';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users-mongos/users.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      database: 'place',
      autoLoadEntities: true,
      synchronize: true,
      // ssl: true,
    }),
    CommonModule,
    // UsersModule,
    UserModule,
    // AuthModule,
  ],
  providers: [BaseLogger],
})
export class AppModule {}
