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
  HasMany,
  BelongsToMany,
  HasOne,
  BeforeCreate,
  BeforeBulkUpdate,
} from 'sequelize-typescript';
import { genSaltSync, hashSync } from 'bcrypt';
import { Roles } from './roles.model';
import { UserProfiles } from './user-profiles.model';
import { UserRefreshTokens } from './user-refresh-tokens.model';
import { UserRoles } from './user-roles.model';

const tableOptions: TableOptions = {
  tableName: 'Users',
  timestamps: true,
  paranoid: true,
};

@Table(tableOptions)
export class Users extends Model<any> {
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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  resetPasswordToken: string;

  @Column({
    type: DataType.DATE,
  })
  resetPasswordSentAt: Date;

  @Column({
    type: DataType.STRING,
  })
  confirmationToken: string;

  @Column({
    type: DataType.DATE,
  })
  confirmedAt: Date;

  @Column({
    type: DataType.DATE,
  })
  confirmationSentAt: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @HasMany(() => UserRefreshTokens, 'userId')
  refreshToken: UserRefreshTokens[];

  @BelongsToMany(() => Roles, () => UserRoles, 'userId')
  roles: Roles[];

  @HasOne(() => UserProfiles, 'userId')
  profile: UserProfiles;

  @BeforeCreate
  static hashPassword(instance: Users) {
    // eslint-disable-next-line no-param-reassign
    instance.password = this.generateHash(instance.password);
  }

  @BeforeBulkUpdate
  static hashPasswordBulkUpdate(instance) {
    if (instance.attributes.password == null) return;
    // eslint-disable-next-line no-param-reassign
    instance.attributes.password = this.generateHash(
      instance.attributes.password
    );
  }

  private static generateHash(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
