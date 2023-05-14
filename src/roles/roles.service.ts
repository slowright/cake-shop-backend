import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/models/roles.model';
import { addRoleDto } from './dto/add-role.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createRole(dto: createRoleDto) {
    const role = await this.roleRepository.create({ ...dto });
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async deleteRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new BadRequestException();
    }
    return await this.roleRepository.destroy({ where: { value } });
  }

  async addRole(dto: addRoleDto) {
    const user = await this.userService.findUserById(dto.userId);
    const role = await this.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', await role.id);

      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
