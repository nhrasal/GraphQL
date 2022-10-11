import { Module } from '@nestjs/common';
import { BaseLogger } from './@logger/Base.logger';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CommonModule, UsersModule, AuthModule],
  providers: [BaseLogger],
})
export class AppModule {}
