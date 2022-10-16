import { Module } from '@nestjs/common';
import { BullQueueModule } from './bullQueue.module';
import { GraphQlModule } from './graphql.module';
import { CustomMailerModule } from './mailer.module';
import { MongDbModule } from './mongodb.module';
import { TypeOrmDBModule } from './TypeOrmDB.module';

@Module({
  imports: [
    GraphQlModule,
    TypeOrmDBModule,
    MongDbModule,
    BullQueueModule,
    CustomMailerModule,
  ],
  exports: [
    GraphQlModule,
    TypeOrmDBModule,
    MongDbModule,
    BullQueueModule,
    CustomMailerModule,
  ],
})
export class CommonModule {}
