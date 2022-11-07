import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { CustomEmailvalidator } from 'src/validator/email.validator';
import { CustomPhonevalidator } from 'src/validator/phone.validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateDto {
  @Validate(CustomEmailvalidator)
  email: string;
  @Validate(CustomPhonevalidator)
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
