import { Controller, Post, Param, Req, Get } from '@nestjs/common';
import { LikeService } from './like.service';
import { Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @Post(':id')
  async likeProduct(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization;
    return this.likeService.likeProduct(id, token);
  }

  @Get()
  async getLikedProduct(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.likeService.getLikedProduct(token);
  }
}
