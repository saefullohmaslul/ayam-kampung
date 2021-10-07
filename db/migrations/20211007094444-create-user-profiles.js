module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UserProfiles',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        avatar: {
          type: Sequelize.STRING,
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

    await queryInterface.addColumn('UserProfiles', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await Promise.all([queryInterface.addIndex('UserProfiles', ['userId'])]);
  },

  down: (queryInterface) => queryInterface.dropTable('UserProfiles'),
};
