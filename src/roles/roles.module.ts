import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/roles.model';
import { User } from 'src/models/user.model';
import { UserRoles } from 'src/models/user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
