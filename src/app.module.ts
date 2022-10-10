import { Module } from '@nestjs/common';
import { BaseLogger } from './@logger/Base.logger';
import { CommonModule } from './common/common.module';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CommonModule, UsersModule],
  providers: [BaseLogger],
})
export class AppModule {}
