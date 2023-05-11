import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/models/product.model';
@Injectable()
export class SearchService {
  constructor(private readonly productService: ProductService) {}

  async searchProductByTitle(
    title: string,
    category: string,
  ): Promise<Product[] | []> {
    const productData = await this.productService.getProductByCategory(
      category,
    );
    const data = productData.filter((item) => item.title.includes(title));
    return data;
  }
}
