module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UserRefreshTokens',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        refreshToken: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        expiredAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        isBlacklisted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        paranoid: true,
      }
    );

    await queryInterface.addColumn('UserRefreshTokens', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await Promise.all([
      queryInterface.addIndex('UserRefreshTokens', ['refreshToken']),
      queryInterface.addIndex('UserRefreshTokens', ['userId', 'refreshToken']),
      queryInterface.addIndex('UserRefreshTokens', ['deletedAt']),
    ]);
  },

  down: (queryInterface) => queryInterface.dropTable('UserRefreshTokens'),
};
