/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';


@Module({
  imports: [],
  controllers: [HttpModule, DatabaseModule],
  providers: [],
})
export class AppModule {}
