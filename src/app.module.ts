import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './@exceptions/AllExceptionsFilter';
import { ResponseInterceptor } from './@interceptors/response.interceptor';
import { BaseLogger } from './@logger/Base.logger';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CommonModule, UsersModule],
  controllers: [],
  providers: [
    BaseLogger,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ],
})
export class AppModule {}
