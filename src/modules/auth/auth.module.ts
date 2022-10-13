import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users-mongos/users.module';
import { UserModule } from '../users/user.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthResolver],
})
export class AuthModule {}
