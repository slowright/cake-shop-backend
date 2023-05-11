import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async getUserProfile(_token: string): Promise<User> {
    const bearer = _token.split(' ')[0];
    const token = _token.split(' ')[1];
    const data = await this.tokenService.validateAccessToken(token);
    if (bearer !== 'Bearer' || !data) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findUserById(data.id);
    return user;
  }

  async changeName(_token: string, name: string) {
    const bearer = _token.split(' ')[0];
    const token = _token.split(' ')[1];
    const data = await this.tokenService.validateAccessToken(token);
    if (bearer !== 'Bearer' || !data) {
      throw new UnauthorizedException();
    }
    await this.userService.changeName(data.id, name);
    return;
  }

  async changeLastName(_token: string, lastName: string) {
    const bearer = _token.split(' ')[0];
    const token = _token.split(' ')[1];
    const data = await this.tokenService.validateAccessToken(token);
    if (bearer !== 'Bearer' || !data) {
      throw new UnauthorizedException();
    }
    await this.userService.changeLastName(data.id, lastName);
    return;
  }

  async changePassword(_token: string, password: string) {
    const bearer = _token.split(' ')[0];
    const token = _token.split(' ')[1];
    const data = await this.tokenService.validateAccessToken(token);
    if (bearer !== 'Bearer' || !data) {
      throw new UnauthorizedException();
    }
    await this.userService.changePassword(data.id, password);
    return;
  }
}
