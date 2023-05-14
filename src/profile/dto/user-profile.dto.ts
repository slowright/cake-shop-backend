import { Cart } from 'src/models/cart.model';
import { User } from 'src/models/user.model';

export class UserProfileDto {
  name: string;
  lastname: string;
  email: string;
  year: number;
  month: number;
  day: number;
  cart: Cart[];

  constructor(model: User) {
    this.name = model.name;
    this.lastname = model.lastname;
    this.email = model.email;
    this.year = model.year;
    this.month = model.month;
    this.day = model.day;
    this.cart = model.cart;
  }
}
