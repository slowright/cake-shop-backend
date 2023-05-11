import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  async createUser(dto: RegisterUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 7);
    const user = {
      name: dto.name,
      lastname: dto.lastname,
      email: dto.email,
      password: hashPassword,
      year: dto.year,
      month: dto.month,
      day: dto.day,
    };
    return await this.userRepository.create(user);
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
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
