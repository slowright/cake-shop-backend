import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { ProductModule } from 'src/product/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from 'src/models/like.model';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [ProductModule, TokenModule, SequelizeModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
