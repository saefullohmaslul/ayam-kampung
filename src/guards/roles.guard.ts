import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FORBIDDEN_RESOURCE } from './auth.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const { user } = request;
    const matchRole = roles.filter((role) => user.roles.indexOf(role) !== -1);

    if (matchRole.length <= 0) {
      throw new HttpException(FORBIDDEN_RESOURCE, HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
