import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/roles.model';
import { User } from 'src/models/user.model';
import { UserRoles } from 'src/models/user-roles.model';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    TokenModule,
    ProductModule,
    forwardRef(() => UserModule),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
