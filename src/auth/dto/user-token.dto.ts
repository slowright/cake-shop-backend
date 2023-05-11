import { User } from 'src/models/user.model';

export class UserTokenDto {
  email: string;
  id: string;
  constructor(model: User) {
    this.email = model.email;
    this.id = model.id;
  }
}
