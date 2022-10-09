import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQlModule } from './common/graphql.module';
import { MongDbModule } from './common/mongodb.module';

@Module({
  imports: [GraphQlModule, MongDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
