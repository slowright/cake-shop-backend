import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([User]), UserModule, TokenModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
