import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({
    description: 'user email',
    type: String,
    format: 'email',
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
