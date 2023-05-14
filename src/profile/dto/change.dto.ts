import { Length, IsEmail } from 'class-validator';

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

export class ChangeDto {
  @Length(3)
  name: string;
  @Length(3)
  lastname: string;

  @IsEmail()
  email: string;
  @Length(6)
  password: string;
  address: string;
  number: string;
}
