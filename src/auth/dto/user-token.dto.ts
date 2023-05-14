import { Role } from 'src/models/roles.model';
import { User } from 'src/models/user.model';

export class UserTokenDto {
  email: string;
  id: string;
  roles: Role[];
  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
    this.roles = model.roles;
  }
}
