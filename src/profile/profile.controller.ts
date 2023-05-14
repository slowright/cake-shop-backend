import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';
import { ChangeDto } from './dto/change.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  async getUserProfile(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.profileService.getUserProfile(token);
  }

  @Put('change')
  changeOptions(@Body() dto: ChangeDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return this.profileService.changeOptions(dto, token);
  }
}
