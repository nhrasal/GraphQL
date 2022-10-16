import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ENV } from 'src/ENV';

@Module({
  imports: [
    BullModule.forRoot({
      redis: ENV.Redis,
    }),
  ],
})
export class BullQueueModule {}
