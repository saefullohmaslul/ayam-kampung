import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'src/models/response.model';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dtos/login-req.dto';
import { SignupReqDto } from './dtos/signup-req.dto';
import { SignupResDto } from './dtos/signup-res.dto';

@Injectable()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(
    @Body() signupReqDto: SignupReqDto
  ): Promise<Response<SignupResDto>> {
    return this.authService.signup(signupReqDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginReqDto: LoginReqDto
  ): Promise<Response<SignupResDto>> {
    return this.authService.login(loginReqDto);
  }
}
