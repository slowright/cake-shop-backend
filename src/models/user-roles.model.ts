import {
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './roles.model';

@Table({ tableName: 'User_Roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model {
  @Column({ unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ForeignKey(() => User)
  @Column
  userId: Number;
}
