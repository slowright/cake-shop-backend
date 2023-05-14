import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';
import { SkipAuth } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { addRoleDto } from './dto/add-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  // @SkipAuth()
  @Post('create')
  createRole(@Body() dto: createRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:value')
  deleteRoleByValue(@Param('value') value: string) {
    return this.roleService.deleteRoleByValue(value);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add')
  addRole(@Body() dto: addRoleDto) {
    return this.roleService.addRole(dto);
  }
}
