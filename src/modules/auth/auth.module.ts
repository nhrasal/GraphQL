import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users-mongos/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthResolver],
})
export class AuthModule {}
