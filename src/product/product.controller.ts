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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { FileType, FilesService } from 'src/files/files.service';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FilesService,
  ) {}

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
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.productService.getProduct(
      group,
      category,
      title,
      count,
      offset,
    );
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  createProduct(@Body() dto: CreateProductDto) {
    console.log(dto);
    return this.productService.createProduct(dto);
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create-photo')
  @UseInterceptors(FileInterceptor('image'))
  createProductPhoto(@UploadedFile() image: Express.Multer.File) {
    return this.fileService.createFile(FileType.IMAGE, image);
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
