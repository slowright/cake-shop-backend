import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { AdminService } from './admin.service';
import { ProductService } from 'src/product/product.service';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly productService: ProductService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create-product')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete-product/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('update-product/:id')
  updateProduct(@Body() dto: UpdateProductDto, @Param('id') id: string) {
    return this.productService.updateProduct(dto, id);
  }
}
