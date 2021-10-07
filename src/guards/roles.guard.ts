import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from 'src/models/roles.model';
import { Users } from 'src/models/users.model';
import { FORBIDDEN_RESOURCE } from './auth.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Users) private readonly usersModel: typeof Users
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const { user } = request;

    const userData = await this.usersModel.findByPk(user.id, {
      attributes: ['id'],
      include: [
        {
          model: Roles,
          as: 'roles',
          attributes: ['name'],
          through: {
            attributes: [],
          },
          required: true,
        },
      ],
    });

    const userRoles = userData.roles.map((role) => role.name);

    const matchRole = roles.filter((role) => userRoles.indexOf(role) !== -1);

    if (matchRole.length <= 0) {
      throw new HttpException(FORBIDDEN_RESOURCE, HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
