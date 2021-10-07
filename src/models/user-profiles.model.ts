/* eslint-disable import/no-cycle */
import {
  Column,
  CreatedAt,
  DeletedAt,
  Table,
  TableOptions,
  UpdatedAt,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './users.model';

const tableOptions: TableOptions = {
  tableName: 'UserProfiles',
  timestamps: true,
  paranoid: true,
};

@Table(tableOptions)
export class UserProfiles extends Model<any> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  avatar: string;

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
