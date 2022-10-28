import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateDto {
  email: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsString()
  gender: string;
}
