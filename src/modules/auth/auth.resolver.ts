import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver ,} from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import { User } from 'src/modules/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { Session } from '../session/session.entity';
import { SessionsService } from '../session/session.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
@UseGuards(GqlAuthGuard)
async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
  const loginResponse = await this.authService.login(loginUserInput);
  return loginResponse;
}
@Mutation(() => Boolean)
  async logout(@Args('sessionId') sessionId: number) {
    await this.authService.logout(sessionId);
    return true;
  }

  @Mutation(() => User)
  signup(@Args('signupUserInput') signupUserInput: CreateUserInput) {
    return this.authService.signup(signupUserInput);
  }
 
}
