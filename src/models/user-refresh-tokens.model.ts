/* eslint-disable import/no-cycle */
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  TableOptions,
  UpdatedAt,
} from 'sequelize-typescript';
import { Users } from './users.model';

const tableOptions: TableOptions = {
  tableName: 'UserRefreshTokens',
  timestamps: true,
  paranoid: true,
};

@Table(tableOptions)
export class UserRefreshTokens extends Model<any> {
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
  refreshToken: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  expiredAt: Date;

  @Column({
    type: DataType.DATE,
  })
  isBlacklisted: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => Users)
  @Column
  userId: string;

  @BelongsTo(() => Users, 'userId')
  user: Users;
}
