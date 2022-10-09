import { Module } from '@nestjs/common';
import { GraphQlModule } from './graphql.module';
import { MongDbModule } from './mongodb.module';

@Module({
  imports: [GraphQlModule, MongDbModule],
  exports: [GraphQlModule, MongDbModule],
})
export class CommonModule {}
