import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyProductDto } from './dto/buy-product.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { CreateProductDto } from 'src/admin/dto/create-product.dto';
import { UpdateProductDto } from 'src/admin/dto/update-product.dto';

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
    if (!productData) {
      throw new BadRequestException();
    }
    return productData;
  }

  async getProductById(id: string): Promise<Product> {
    const productData = await this.productRepository.findOne({
      where: { id },
    });
    if (!productData) {
      throw new BadRequestException();
    }
    return productData;
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const existProduct = await this.productRepository.findOne({
      where: { title: dto.title },
    });
    if (existProduct) {
      throw new BadRequestException(
        'Продукт с таким названием уже существует!',
      );
    }

    const product = await this.productRepository.create({ ...dto });
    return product;
  }

  async deleteProduct(id: string) {
    const existProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existProduct) {
      throw new BadRequestException('Указан неверный id продукта!');
    }
    return await this.productRepository.destroy({ where: { id } });
  }

  async updateProduct(dto: UpdateProductDto, id: string) {
    const existProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existProduct) {
      throw new BadRequestException('Указан неверный id продукта!');
    }
    return await this.productRepository.update(
      {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        price: dto.price,
        link: dto.link,
      },
      { where: { id } },
    );
  }
}
