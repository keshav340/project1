import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { SessionsService } from '../session/session.service';
import { Session } from '../session/session.entity';
import { LoginResponse } from './dto/login-response';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sessionsService: SessionsService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    const user = await this.usersService.findOne(loginUserInput.email);

    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(loginUserInput.password, user.password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const access_token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
      role: user.role,
    });

    // Create a session in the database
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); // Session expires in 1 hour
    const session: Session = await this.sessionsService.createSession(user, access_token, expiration);

    const loginResponse: LoginResponse = {
      access_token,
      user: user,
      sessions: [session],
    };

    return loginResponse;
  }

  async signup(signupUserInput: CreateUserInput): Promise<User> {
    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(signupUserInput.password, 10);

    const newUser: User = await this.usersService.create({
      ...signupUserInput,
      password: hashedPassword,
    });

    return newUser;
  }

  async logout(sessionId: number): Promise<void> {
    const session = await this.sessionsService.getSessionById(sessionId);

    if (!session) {
      throw new Error('Session not found');
    }
    await this.sessionsService.deleteSession(sessionId);
  }
}
