import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { ChangeDto } from 'src/profile/dto/change.dto';
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

  async changeOptions(id: string, dto: ChangeDto) {
    const hash = await bcrypt.hash(dto.password, 5);
    return await this.userRepository.update(
      {
        name: dto.name,
        lastname: dto.lastname,
        email: dto.email,
        password: hash,
        number: dto.number,
        address: dto.address,
      },
      { where: { id } },
    );
  }
}
