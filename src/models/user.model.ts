import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Token } from './token.model';
import { Like } from './like.model';
import { Cart } from './cart.model';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  year: number;

  @Column
  month: number;

  @Column
  day: number;

  @HasOne(() => Token, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  token: Token;

  @HasMany(() => Like, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  like: Like[];

  @HasMany(() => Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart: Cart[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
