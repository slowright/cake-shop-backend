import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from './dto/create-role.dto';
import { SkipAuth } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { addRoleDto } from './dto/add-role.dto';
import { ProductService } from 'src/product/product.service';
import { UpdateProductDto } from 'src/roles/dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly roleService: RolesService,
    private readonly productService: ProductService,
  ) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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
