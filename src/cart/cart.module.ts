import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TokenModule } from 'src/token/token.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from 'src/models/cart.model';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TokenModule, ProductModule, SequelizeModule.forFeature([Cart])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
