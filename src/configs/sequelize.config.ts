import { Injectable } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  // eslint-disable-next-line class-methods-use-this
  createSequelizeOptions(): SequelizeModuleOptions {
    const { DB_HOST, DB_PASS, DB_USER, DB_PORT, DB_NAME } = process.env;
    const sequelizeConfig: SequelizeModuleOptions = {
      dialect: 'postgres',
      port: parseInt(DB_PORT, 10),
      database: DB_NAME,
      autoLoadModels: true,
      pool: {
        min: 1,
        max: 5,
        evict: 10000,
        idle: 10000,
      },
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASS,
      timezone: '+07:00',
      dialectOptions: {
        useUTC: true,
      },
    };

    return sequelizeConfig;
  }
}
