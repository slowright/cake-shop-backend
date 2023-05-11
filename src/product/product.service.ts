import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyProductDto } from './dto/buy-product.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async buyProduct(token: string, productDto: BuyProductDto): Promise<Number> {
    if (!token) {
      return Number(productDto.count) * Number(productDto.productId); // Change productId !!!
    }
    const jwtToken = token.split(' ')[1];
    const signToken = this.tokenService.validateAccessToken(jwtToken);
    const user = await this.userService.findUserById(signToken.id);
    if (!user) {
      throw new BadRequestException('');
    }

    const data = new Date();
    const month = data.getMonth();
    const day = data.getDay();
    if (user.month == month && user.day == day) {
      return Number(productDto.count) * Number(productDto.productId) * 0.95;
    }

    return Number(productDto.count) * Number(productDto.productId) * 0.97;
  }

  async getProductByCategory(category: string): Promise<Product[]> {
    const productData = await this.productRepository.findAll({
      where: { category },
    });
    return productData;
  }
}
