import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import Role from 'src/modules/enums/roles.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  
  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  
  @Roles(Role.ADMIN)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }
}
