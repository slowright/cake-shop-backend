import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';
import {
  ChangeLastNameDto,
  ChangeNameDto,
  ChangePasswordDto,
} from './dto/change.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  async getUserProfile(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.profileService.getUserProfile(token);
  }

  @Put('change-name')
  async changeName(@Req() req: Request, @Body() paramDto: ChangeNameDto) {
    const token = req.headers.authorization;
    return this.profileService.changeName(token, paramDto.name);
  }

  @Put('change-lastname')
  async changeLastName(
    @Req() req: Request,
    @Body() paramDto: ChangeLastNameDto,
  ) {
    const token = req.headers.authorization;
    return this.profileService.changeLastName(token, paramDto.lastName);
  }

  @Put('change-password')
  async changePassword(
    @Req() req: Request,
    @Body() paramDto: ChangePasswordDto,
  ) {
    const token = req.headers.authorization;
    return this.profileService.changePassword(token, paramDto.password);
  }
}
