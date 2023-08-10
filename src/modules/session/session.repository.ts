import { EntityRepository, Repository ,LessThan} from 'typeorm';
import { Session } from './session.entity';

@EntityRepository(Session)
export class SessionsRepository extends Repository<Session> {
  async createSession(userId: number, token: string, expiresAt: Date): Promise<Session> {
    const session = new Session();
    session.userId = userId;
    session.token = token;
    session.expiresAt = expiresAt;
    return this.save(session);
  }

  async findSessionByToken(token: string): Promise<Session | undefined> {
    return this.findOne({where:{ token }});
  }

  async deleteSession(token: string): Promise<void> {
    await this.delete({ token });
  }

  async cleanupExpiredSessions(): Promise<void> {
    await this.delete({ expiresAt: LessThan(new Date()) });
  }
}
