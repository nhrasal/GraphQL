import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [AuthResolver],
})
export class AuthModule {}
