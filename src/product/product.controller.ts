import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  UseGuards,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { BuyProductDto } from './dto/buy-product.dto';
import { Request } from 'express';
import { SkipAuth } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateProductDto } from 'src/roles/dto/create-product.dto';
import { UpdateProductDto } from 'src/roles/dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('show-price')
  async buyProduct(@Body() productDto: BuyProductDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return this.productService.buyProduct(token, productDto);
  }

  @SkipAuth()
  @Get('/:group?category&?title')
  async getProductByCategory(
    @Param('group') group: string,
    @Query('category') category: string,
    @Query('title') title: string,
  ) {
    return this.productService.getProduct(group, category, title);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'productAvatar', maxCount: 1 }]),
  )
  createProduct(@Body() dto: CreateProductDto, @UploadedFiles() files) {
    const { productAvatar } = files;
    return this.productService.createProduct(dto, productAvatar[0]);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('update/:id')
  updateProduct(@Body() dto: UpdateProductDto, @Param('id') id: string) {
    return this.productService.updateProduct(dto, id);
  }
}
