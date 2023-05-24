import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column
  group: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  category: string;

  @Column
  price: number;

  @Column
  link: string;
}
