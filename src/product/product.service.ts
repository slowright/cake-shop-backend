import { Injectable, BadRequestException } from '@nestjs/common';
import { BuyProductDto } from './dto/buy-product.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { UpdateProductDto } from 'src/roles/dto/update-product.dto';
import { CreateProductDto } from 'src/roles/dto/create-product.dto';
import { FileType, FilesService } from 'src/files/files.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly fileService: FilesService,
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

  async getProductByGroup(group, limit, offset): Promise<Product[]> {
    const productData = await this.productRepository.findAll({
      where: { group },
      offset,
      limit,
    });
    if (!productData) {
      throw new BadRequestException();
    }
    return productData;
  }

  async getProduct(
    group: string,
    category: string,
    title: string,
    count: number = 10,
    offset: number = 0,
  ): Promise<Product[]> {
    if (!title && !category) {
      return await this.getProductByGroup(group, count, offset);
    }
    if (category && !title) {
      const products = await this.getProductByGroup(group, count, offset);
      products.filter((product) => {
        product.category === category;
      });
      return products;
    }

    const products = await this.getProductByGroup(group, count, offset);
    products.filter((product) => {
      product.title === title;
    });
    return products;
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
    if (existProduct)
      throw new BadRequestException(
        'Продукт с таким названием уже существует!',
      );
    const product = await this.productRepository.create({
      ...dto,
    });
    return product;
  }

  async deleteProduct(id: string) {
    const existProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existProduct) {
      throw new BadRequestException('Указан неверный id продукта!');
    }
    await this.fileService.removeFile(FileType.IMAGE, existProduct.link);
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
