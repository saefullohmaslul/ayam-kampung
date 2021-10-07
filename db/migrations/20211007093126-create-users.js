module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        phoneNumber: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        resetPasswordToken: {
          type: Sequelize.STRING,
        },
        resetPasswordSentAt: {
          type: Sequelize.DATE,
        },
        confirmationToken: {
          type: Sequelize.STRING,
        },
        confirmedAt: {
          type: Sequelize.DATE,
        },
        confirmationSentAt: {
          type: Sequelize.DATE,
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

    await Promise.all([
      queryInterface.addIndex('Users', ['email'], { unique: true }),
      queryInterface.addIndex('Users', ['resetPasswordToken'], {
        unique: true,
      }),
      queryInterface.addIndex('Users', ['confirmationToken'], { unique: true }),
      queryInterface.addIndex('Users', ['deletedAt']),
    ]);
  },

  down: (queryInterface) => queryInterface.dropTable('Users'),
};
