import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from 'src/models/like.model';
import { ProductService } from 'src/product/product.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like) private readonly likeRepository: typeof Like,
    private readonly productService: ProductService,
    private readonly tokenService: TokenService,
  ) {}
  async likeProduct(id, bearerToken) {
    const findProduct = await this.productService.getProductById(id);
    const token = bearerToken.split(' ')[1];
    const decode = this.tokenService.validateAccessToken(token);
    await this.likeRepository.create({
      productId: findProduct.id,
      userId: decode.id,
    });
    return decode;
  }

  async getLikedProduct(bearerToken) {
    const token = bearerToken.split(' ')[1];
    const userId = this.tokenService.validateAccessToken(token).id;
    const foundLikedProducts = await this.likeRepository.findAll({
      where: { userId },
    });

    const data = [];
    for (let i = 0; i < foundLikedProducts.length; i++) {
      const element = foundLikedProducts[i];
      const product = await this.productService.getProductById(
        element.productId,
      );
      data.push(product);
    }

    return data;
  }
}
