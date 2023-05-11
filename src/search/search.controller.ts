import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':title/:category')
  async searchProductByTitle(
    @Param('title') title: string,
    @Param('category') category: string,
  ) {
    return this.searchService.searchProductByTitle(title, category);
  }
}
