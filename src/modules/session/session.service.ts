// session/sessions.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Session} from "src/modules/session/session.entity"
import { User } from '../users/entities/user.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
  ) {}

  async createSession(user: User, token: string, expiration: Date): Promise<Session> {
    const session = this.sessionsRepository.create({ user, token, expiration });
    return this.sessionsRepository.save(session);
  }
  async getUserSessions(userId: number): Promise<Session[]> {
    const options: FindManyOptions<Session> = {
        where: { user: { id: userId } }, // Correct usage of the user's ID
      };
    return this.sessionsRepository.find(options);
  }
   async getSessionById(sessionId: number): Promise<Session | undefined> {
     return this.sessionsRepository.findOne({where:{id:sessionId}});
   }

  async deleteSession(sessionId: number): Promise<void> {
    await this.sessionsRepository.delete(sessionId);
  }

  
}
