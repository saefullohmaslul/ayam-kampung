import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenReqDto {
  @ApiProperty({
    description: 'refresh token',
    type: String,
    example:
      '74673e4f-935f-4926-a40b-22aec11c9021.2e93508fb8d6f5db53bfee145a62363241390144578fb7c301b21a38d4665d913675cb9f63fde5c5',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
