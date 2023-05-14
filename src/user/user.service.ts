import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @Inject(forwardRef(() => RolesService))
    private readonly roleService: RolesService,
  ) {}
  async createUser(dto: RegisterUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 7);
    const _user = {
      name: dto.name,
      lastname: dto.lastname,
      email: dto.email,
      password: hashPassword,
      year: dto.year,
      month: dto.month,
      day: dto.day,
    };
    const user = await this.userRepository.create(_user);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    return user;
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async changeName(id: string, name: string) {
    return await this.userRepository.update({ name }, { where: { id } });
  }

  async changeLastName(id: string, lastName: string) {
    return await this.userRepository.update({ lastName }, { where: { id } });
  }

  async changePassword(id: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 5);
    return await this.userRepository.update(
      { password: hashPassword },
      { where: { id } },
    );
  }
}
