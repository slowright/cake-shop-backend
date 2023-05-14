import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TokenModule, UserModule, JwtModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
