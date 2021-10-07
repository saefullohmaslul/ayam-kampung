/* eslint-disable import/no-cycle */
import { IsNotEmpty, IsString } from 'class-validator';
import { ModelOptions } from 'sequelize';
import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRoles } from './user-roles.model';
import { Users } from './users.model';

const modelOptions: ModelOptions = {
  tableName: 'Roles',
  timestamps: true,
  paranoid: true,
};

@Table(modelOptions)
export class Roles extends Model<Roles> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @BelongsToMany(() => Users, () => UserRoles, 'roleId')
  users: Users[];
}
