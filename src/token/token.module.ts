import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'src/models/token.model';

@Module({
  imports: [SequelizeModule.forFeature([Token]), JwtModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
