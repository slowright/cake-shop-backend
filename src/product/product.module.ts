import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';

@Module({
  imports: [UserModule, TokenModule, SequelizeModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
