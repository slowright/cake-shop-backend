import {
  Controller,
  Param,
  Post,
  Put,
  Query,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.cartService.getCart(token);
  }

  @Post('push/:id')
  async pushProductInCard(
    @Param('id') id: string,
    @Query('count') count: number,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization;
    return this.cartService.pushProductInCart(id, token, count);
  }

  @Delete('/:id')
  async removeProductInCart(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization;
    return this.cartService.removeProductInCart(id, token);
  }

  @Put('plus/:id')
  plusOneInCart(@Req() req: Request, @Param('id') id: string) {
    const token = req.headers.authorization;
    return this.cartService.plusOneInCart(id, token);
  }

  @Put('minus/:id')
  minusOneInCart(@Req() req: Request, @Param('id') id: string) {
    const token = req.headers.authorization;
    return this.cartService.minusOneInCart(id, token);
  }
}
