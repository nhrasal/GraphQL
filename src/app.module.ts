import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './@exceptions/AllExceptionsFilter';
import { ResponseInterceptor } from './@interceptors/response.interceptor';
import { BaseLogger } from './@logger/Base.logger';
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
  providers: [
    BaseLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
