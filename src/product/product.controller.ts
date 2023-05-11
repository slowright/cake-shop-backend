import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { BuyProductDto } from './dto/buy-product.dto';
import { Request } from 'express';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('buy')
  async buyProduct(@Body() productDto: BuyProductDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return this.productService.buyProduct(token, productDto);
  }

  @Get(':category')
  async getProductByCategory(@Param('category') category: string) {
    return this.productService.getProductByCategory(category);
  }
}
