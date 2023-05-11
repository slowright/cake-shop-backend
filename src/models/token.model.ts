import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Token extends Model {
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  userId: number;

  @Column(DataType.TEXT)
  refreshToken: string;
}
