

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {SessionsService} from "src/modules/session/session.service"
import { Session } from './session.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}

