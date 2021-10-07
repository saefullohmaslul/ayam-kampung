/* eslint-disable class-methods-use-this */
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { verify, Algorithm } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { INVALID_TOKEN } from './auth.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    let decodedToken: any;
    const { JWT_ALGORITHM, JWT_AUDIENCE, JWT_ISSUER, JWT_PUBLIC_KEY } =
      process.env;

    const { headers } = context.switchToHttp().getRequest();
    const data: any = context.switchToRpc().getData();

    const publicKey = readFileSync(JWT_PUBLIC_KEY);
    try {
      const { authorization } = headers;
      const token = authorization.replace('Bearer ', '');

      decodedToken = verify(token, publicKey, {
        algorithms: [JWT_ALGORITHM as Algorithm],
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
      });
    } catch (error) {
      throw new HttpException(INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    data.user = {
      id: decodedToken.userId,
    };

    return true;
  }
}
