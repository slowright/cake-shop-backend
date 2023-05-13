import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';
import { SkipAuth } from 'src/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @SkipAuth()
  @Post()
  createRole(@Body() dto: createRoleDto) {
    return this.roleService.createRole(dto);
  }
  @SkipAuth()
  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
