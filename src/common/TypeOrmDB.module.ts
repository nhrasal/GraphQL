import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'src/ENV';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: ormConfig.type,
      host: ormConfig.host,
      port: ormConfig.port,
      database: ormConfig.database,
      autoLoadEntities: true,
      synchronize: true,
      // ssl: true,
    }),
  ],
})
export class TypeOrmDBModule {}
