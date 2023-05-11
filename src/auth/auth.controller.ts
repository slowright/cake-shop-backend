import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/user-register.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtAuthGuard } from 'src/guards/jwt_auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registerUser(@Body() dto: RegisterUserDto, @Res() res: Response) {
    const userData = await this.authService.registerUser(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json(userData);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginUserDto, @Res() res: Response) {
    const userData = await this.authService.loginUser(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json(userData);
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { token } = req.cookies;
    const userData = await this.authService.refreshToken(token);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Req() req: Request) {
    return req.user;
  }

  @Get('hello')
  hello() {
    return 'hello world';
  }
}
