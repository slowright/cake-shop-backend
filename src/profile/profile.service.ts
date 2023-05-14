import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { UserProfileDto } from './dto/user-profile.dto';
import { ChangeDto } from './dto/change.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async getUserProfile(_token: string): Promise<UserProfileDto> {
    const bearer = _token.split(' ')[0];
    const token = _token.split(' ')[1];
    const data = await this.tokenService.validateAccessToken(token);
    if (bearer !== 'Bearer' || !data) {
      throw new UnauthorizedException();
    }
    const _user = await this.userService.findUserById(data.id);
    const user = new UserProfileDto(_user);
    return user;
  }

  async changeOptions(dto: ChangeDto, _token: string) {
    const bearer = _token.split(' ')[0];
    const token = _token.split(' ')[1];
    const data = await this.tokenService.validateAccessToken(token);
    if (bearer !== 'Bearer' || !data) {
      throw new UnauthorizedException();
    }
    return this.userService.changeOptions(data.id, dto);
  }
}
