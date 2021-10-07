import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class VerifyOtpReqDto {
  @ApiProperty({
    description: 'otp code',
    minLength: 6,
    maxLength: 6,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6, {
    message: 'otp must be 6 character',
  })
  otp: string;

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
    message: 'phone number too long',
  })
  phone: string;
}
