/* eslint-disable import/no-cycle */
import { ModelOptions } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Roles } from './roles.model';
import { Users } from './users.model';

const modelOptions: ModelOptions = {
  tableName: 'UserRoles',
  timestamps: true,
  paranoid: true,
};

@Table(modelOptions)
export class UserRoles extends Model<any> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => Users)
  @Column
  userId: string;

  @ForeignKey(() => Roles)
  @Column
  roleId: string;
}
