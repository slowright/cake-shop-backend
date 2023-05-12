import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from 'src/models/cart.model';
import { ProductService } from 'src/product/product.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
    private readonly tokenService: TokenService,
    private readonly productService: ProductService,
  ) {}

  async getCart(bearerToken: string) {
    const token = bearerToken.split(' ')[1];
    const decode = this.tokenService.validateAccessToken(token);
    const foundCart = await this.cartRepository.findAll({
      where: { userId: decode.id },
    });
    return foundCart;
  }

  async pushProductInCart(id: string, bearerToken: string, count: number) {
    const findProduct = await this.productService.getProductById(id);
    if (!findProduct) throw new BadRequestException();
    const token = bearerToken.split(' ')[1];
    const decode = this.tokenService.validateAccessToken(token);
    const foundProductInCart = await this.cartRepository.findOne({
      where: { productId: Number(findProduct.id) },
    });
    if (!foundProductInCart) {
      const inCart = await this.cartRepository.create({
        productId: findProduct.id,
        productCount: count,
        productPrice: findProduct.price,
        userId: decode.id,
      });
      return inCart;
    }
    const inCart = await this.cartRepository.update(
      {
        productCount: Number(count) + foundProductInCart.productCount,
      },
      { where: { productId: findProduct.id } },
    );
    return inCart;
  }

  async removeProductInCart(id: string, bearerToken: string) {
    const foundInCart = await this.cartRepository.findOne({ where: { id } });
    if (!foundInCart) throw new BadRequestException();
    await this.cartRepository.destroy({ where: { id } });
    return;
  }

  async plusOneInCart(id: string, bearerToken: string) {
    const foundInCart = await this.cartRepository.findOne({ where: { id } });
    if (!foundInCart) throw new BadRequestException();
    return await this.cartRepository.update(
      {
        productCount: foundInCart.productCount + 1,
      },
      { where: { id } },
    );
  }

  async minusOneInCart(id: string, bearerToken: string) {
    const foundInCart = await this.cartRepository.findOne({ where: { id } });
    if (!foundInCart) throw new BadRequestException();
    if (foundInCart.productCount === 1) {
      return this.removeProductInCart(id, bearerToken);
    }
    return await this.cartRepository.update(
      {
        productCount: foundInCart.productCount - 1,
      },
      { where: { id } },
    );
  }
}
