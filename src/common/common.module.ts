import { Module } from '@nestjs/common';
import { GraphQlModule } from './graphql.module';
import { MongDbModule } from './mongodb.module';
import { TypeOrmDBModule } from './TypeOrmDB.module';

@Module({
  imports: [TypeOrmDBModule, GraphQlModule, MongDbModule],
  exports: [TypeOrmDBModule, GraphQlModule, MongDbModule],
})
export class CommonModule {}
