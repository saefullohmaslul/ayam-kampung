import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addDays, addSeconds, format } from 'date-fns';
import { randomBytes } from 'crypto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { Response } from 'src/models/response.model';
import { Users } from 'src/models/users.model';
import { UserRefreshTokens } from 'src/models/user-refresh-tokens.model';
import { Roles } from 'src/models/roles.model';
import { Sequelize } from 'sequelize-typescript';
import { UserProfiles } from 'src/models/user-profiles.model';
import {
  EMAIL_ALREADY_EXIST,
  INVALID_PASSWORD,
  PHONE_NUMBER_ALREADY_EXIST,
  SUCCESS_GENERATE_TOKEN,
  USER_NOT_FOUND,
} from './constants/auth.constant';
import { SignupReqDto } from './dtos/signup-req.dto';
import { LoginReqDto } from './dtos/login-req.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users) private readonly userModel: typeof Users,
    @InjectModel(UserProfiles)
    private readonly userProfilesModel: typeof UserProfiles,
    @InjectModel(UserRefreshTokens)
    private readonly userRefreshTokenModel: typeof UserRefreshTokens,
    @InjectModel(Roles) private readonly rolesModel: typeof Roles,
    private readonly jwtService: JwtService,
    private readonly sequelize: Sequelize
  ) {}

  async signup(signupReqDto: SignupReqDto): Promise<Response> {
    const { email, fullName, password, phoneNumber } = signupReqDto;

    const userName = {
      firstName: '',
      lastName: [],
    };

    fullName.split(' ').forEach((name, index) => {
      if (index === 0) {
        userName.firstName = name;
      } else {
        userName.lastName.push(name);
      }
    });

    const isExistEmail = await this.userModel.findOne({
      where: {
        [Op.or]: [
          {
            email,
          },
          {
            phoneNumber,
          },
        ],
      },
      attributes: ['email', 'phoneNumber'],
    });

    if (isExistEmail?.email === email) {
      throw new HttpException(EMAIL_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }

    if (isExistEmail?.phoneNumber === phoneNumber) {
      throw new HttpException(
        PHONE_NUMBER_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST
      );
    }

    const data = await this.sequelize.transaction(async (transaction) => {
      const [user, profile] = await Promise.all([
        this.userModel.create(
          {
            email,
            password,
            phoneNumber,
          },
          { transaction }
        ),
        this.userProfilesModel.create(
          {
            firstName: userName.firstName,
            lastName:
              userName.lastName.length > 0 ? userName.lastName.join(' ') : '',
          },
          { transaction }
        ),
      ]);

      await user.$set('profile', profile, { transaction });
      return user;
    });

    const refreshToken = await this.generateRefreshToken(data.id);
    const { accessToken, expiresIn } = this.generateAccessToken(data.id);

    // TODO: send email verify email

    return new Response(SUCCESS_GENERATE_TOKEN, HttpStatus.OK, {
      refreshToken: refreshToken.refreshToken,
      accessToken,
      expiresIn,
      type: 'Bearer',
    });
  }

  generateAccessToken(userId: string) {
    const { JWT_EXPIRES_IN } = process.env;

    const expiresIn = format(
      addSeconds(new Date(), parseInt(JWT_EXPIRES_IN, 10) / 1000),
      'yyyy-MM-dd HH:mm:ss'
    );

    const accessToken = this.jwtService.sign({
      userId,
    });

    return {
      accessToken,
      expiresIn,
    };
  }

  async generateRefreshToken(userId: string): Promise<UserRefreshTokens> {
    const refreshToken = `${userId}.${randomBytes(40).toString('hex')}`;

    return this.userRefreshTokenModel.create({
      refreshToken,
      userId,
      expiredAt: addDays(new Date(), 7),
    });
  }

  async login(loginReqDto: LoginReqDto): Promise<Response> {
    const { email, password } = loginReqDto;

    const user = await this.userModel.findOne({
      where: { email },
      attributes: ['id', 'password'],
    });

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      throw new HttpException(INVALID_PASSWORD, HttpStatus.UNAUTHORIZED);
    }

    const refreshToken = await this.generateRefreshToken(user.id);
    const { accessToken, expiresIn } = this.generateAccessToken(user.id);

    return new Response(SUCCESS_GENERATE_TOKEN, HttpStatus.OK, {
      refreshToken: refreshToken.refreshToken,
      accessToken,
      expiresIn,
      type: 'Bearer',
    });
  }
}
