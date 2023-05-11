import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from 'src/models/token.model';
import { CreateTokensDto } from './dto/create-tokens.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private readonly tokenRepository: typeof Token,
    private readonly jwtService: JwtService,
    private readonly cfgService: ConfigService,
  ) {}

  generateTokens(payload): CreateTokensDto {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: this.cfgService.get('access_token'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: this.cfgService.get('refresh_token'),
    });

    return { accessToken, refreshToken };
  }

  async saveTokens(userId, refreshToken) {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
    });
    if (tokenData) {
      return await this.tokenRepository.update(refreshToken, {
        where: { userId },
      });
    }
    const token = await this.tokenRepository.create({
      userId,
      refreshToken,
    });
    return token;
  }

  async findTokenById(userId): Promise<Token> {
    const refreshToken = await this.tokenRepository.findOne({
      where: { userId },
    });
    return refreshToken;
  }

  async findTokenByToken(refreshToken): Promise<Token> {
    const token = await this.tokenRepository.findOne({
      where: { refreshToken },
    });
    return token;
  }

  async deleteToken(token) {
    return await this.tokenRepository.destroy({
      where: { refreshToken: token },
    });
  }

  validateAccessToken(token) {
    const userData = this.jwtService.verify(token, {
      secret: this.cfgService.get('access_token'),
    });
    return userData;
  }

  validateRefreshToken(token) {
    const userData = this.jwtService.verify(token, {
      secret: this.cfgService.get('refresh_token'),
    });
    return userData;
  }

  decodeToken(token) {
    const decode = this.jwtService.decode(token);
    return decode;
  }
}
