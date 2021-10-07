import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { Algorithm } from 'jsonwebtoken';

@Injectable()
export class JwtService implements JwtOptionsFactory {
  // eslint-disable-next-line class-methods-use-this
  createJwtOptions(): JwtModuleOptions {
    const {
      JWT_ALGORITHM,
      JWT_AUDIENCE,
      JWT_EXPIRES_IN,
      JWT_ISSUER,
      JWT_PRIVATE_KEY,
    } = process.env;
    return {
      privateKey: readFileSync(JWT_PRIVATE_KEY, { encoding: 'utf8' }),
      signOptions: {
        algorithm: JWT_ALGORITHM as Algorithm,
        audience: JWT_AUDIENCE,
        expiresIn: JWT_EXPIRES_IN,
        issuer: JWT_ISSUER,
      },
    };
  }
}
