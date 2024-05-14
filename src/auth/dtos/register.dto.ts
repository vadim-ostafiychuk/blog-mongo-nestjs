import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 characters',
  })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
