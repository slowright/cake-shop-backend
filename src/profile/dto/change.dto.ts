import { Length } from 'class-validator';

export class ChangeNameDto {
  @Length(3)
  name: string;
}

export class ChangeLastNameDto {
  @Length(3)
  lastName: string;
}
export class ChangePasswordDto {
  @Length(6)
  password: string;
}
