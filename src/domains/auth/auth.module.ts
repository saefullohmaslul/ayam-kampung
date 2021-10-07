import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from 'src/models/roles.model';
import { UserProfiles } from 'src/models/user-profiles.model';
import { UserRefreshTokens } from 'src/models/user-refresh-tokens.model';
import { UserRoles } from 'src/models/user-roles.model';
import { Users } from 'src/models/users.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtService,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SequelizeModule.forFeature([
      Users,
      UserRefreshTokens,
      Roles,
      UserRoles,
      UserProfiles,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
