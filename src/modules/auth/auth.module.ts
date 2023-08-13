import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { SessionsModule } from '../session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../session/session.entity';
import { User } from '../users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Session,User]),
    PassportModule,
    UsersModule,
    SessionsModule,
    JwtModule.register({
      signOptions: { expiresIn: '3h' },
      secret: 'secret',
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    
   
  ],
})
export class AuthModule {}
