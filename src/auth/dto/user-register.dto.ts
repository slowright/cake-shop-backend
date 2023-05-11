import { UserTokenDto } from './user-token.dto';
import {
  IsEmail,
  Length,
  IsNotEmpty,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @Length(3, 12)
  password: string;

  @Min(1900)
  @Max(Number(Date().split(' ')[3]))
  @IsNotEmpty()
  year: number;

  @Min(1)
  @Max(12)
  @IsNumber()
  @IsNotEmpty()
  month: number;

  @Min(1)
  @Max(31)
  @IsNumber()
  @IsNotEmpty()
  day: number;
}

export class ResponseUserAuth {
  accessToken: string;
  refreshToken: string;
  user: UserTokenDto;
}
