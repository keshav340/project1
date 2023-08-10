import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsRepository } from "src/modules/session/session.repository";


@Module({
  imports: [TypeOrmModule.forFeature([SessionsRepository])],
  providers: [SessionsRepository],
  exports: [SessionsRepository], 
})
export class SessionModule {}
