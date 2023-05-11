import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';
import { SkipAuth } from 'src/decorators/public.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @SkipAuth()
  @Get(':title/:category')
  async searchProductByTitle(
    @Param('title') title: string,
    @Param('category') category: string,
  ) {
    return this.searchService.searchProductByTitle(title, category);
  }
}
