import { Cart } from 'src/models/cart.model';
import { Role } from 'src/models/roles.model';

export class UserProfileDto {
  name: string;
  lastname: string;
  email: string;
  year: string;
  month: string;
  day: string;
  cart: Cart[];
  roles: Role[];
}
