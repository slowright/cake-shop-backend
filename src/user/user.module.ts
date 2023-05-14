import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Role } from 'src/models/roles.model';
import { UserRoles } from 'src/models/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    forwardRef(() => RolesModule),
    SequelizeModule.forFeature([User, Role, UserRoles]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
