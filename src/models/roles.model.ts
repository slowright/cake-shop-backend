import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRoles } from './user-roles.model';

@Table
export class Role extends Model {
  @Column
  value: string;

  @Column
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
