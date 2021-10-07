import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  IsEmail,
} from 'class-validator';

export class SignupReqDto {
  @ApiProperty({
    description: 'name of user',
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100, {
    message: 'fullName minimun 3 character',
  })
  fullName: string;

  @ApiProperty({
    description: 'phone number with country code',
    minLength: 9,
    maxLength: 15,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @Length(9, 15, {
    message: 'phoneNumber number too long',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'user email',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 100, {
    message: 'password must minimal 8 character',
  })
  password: string;
}
