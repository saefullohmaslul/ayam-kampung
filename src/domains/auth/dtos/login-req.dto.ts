import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({
    description: 'phone number with country code',
    type: String,
    minLength: 9,
    maxLength: 15,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @Length(9, 15, {
    message: 'phone number too long',
  })
  phone: string;
}
