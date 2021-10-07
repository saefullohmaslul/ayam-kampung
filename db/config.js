const { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT } = process.env;

const sequelizeConfig = {
  dialect: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  logging: false,
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeData',
};

module.exports = sequelizeConfig;
