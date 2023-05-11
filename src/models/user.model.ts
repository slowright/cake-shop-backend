import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Token } from './token.model';

@Table
export class User extends Model {
  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  lastname: string;

  @Column(DataType.TEXT)
  email: string;

  @Column(DataType.TEXT)
  password: string;

  @Column(DataType.NUMBER)
  year: number;

  @Column(DataType.NUMBER)
  month: number;

  @Column(DataType.NUMBER)
  day: number;

  @HasOne(() => Token, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  token: Token;
}
