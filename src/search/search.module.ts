import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
