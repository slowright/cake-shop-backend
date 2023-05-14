import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class AdminService {
  constructor(private readonly productService: ProductService) {}
}
