import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    CommonModule,
    // UsersModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
