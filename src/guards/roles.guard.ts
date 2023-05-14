import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/decorators/roles-auth.decorator';
import { TokenService } from 'src/token/token.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) return true;

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException('Нет доступа');

      const user = this.tokenService.validateAccessToken(token);
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      console.log(error);
    }
  }
}
