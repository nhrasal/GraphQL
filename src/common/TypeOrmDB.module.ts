import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      database: 'place',
      autoLoadEntities: true,
      synchronize: true,
      // ssl: true,
    }),
  ],
})
export class TypeOrmDBModule {}
