import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { RegisterUserDto, ResponseUserAuth } from './dto/user-register.dto';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { UserTokenDto } from './dto/user-token.dto';
import { LoginUserDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly UserRepository: typeof User,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<ResponseUserAuth> {
    const candidate = await this.UserRepository.findOne({
      where: { email: dto.email },
    });
    if (candidate)
      throw new BadRequestException(
        'Пользователь с таким email уже существует!',
      );
    const user = await this.userService.createUser(dto);
    const userDto = new UserTokenDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveTokens(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async loginUser(dto: LoginUserDto): Promise<ResponseUserAuth> {
    const candidate = await this.UserRepository.findOne({
      where: { email: dto.email },
    });
    if (!candidate) throw new BadRequestException('Неверный логин или пароль');
    const checkPassword = await bcrypt.compare(
      dto.password,
      candidate.password,
    );
    if (!checkPassword)
      throw new BadRequestException('Неверный логин или пароль');
    const userDto = new UserTokenDto(candidate);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveTokens(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logoutUser(refreshToken) {
    await this.tokenService.deleteToken(refreshToken);
    return;
  }

  async refreshToken(token: string): Promise<ResponseUserAuth> {
    if (!token) {
      throw new UnauthorizedException();
    }
    const userData = this.tokenService.validateRefreshToken(token);
    const tokenFromDb = await this.tokenService.findTokenByToken(token);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }
    const user = await this.UserRepository.findOne({
      where: { id: userData.id },
    });
    const userDto = new UserTokenDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveTokens(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
