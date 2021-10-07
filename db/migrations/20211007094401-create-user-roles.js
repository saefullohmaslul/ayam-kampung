module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UserRoles',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
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
      queryInterface.addColumn('UserRoles', 'userId', {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
      queryInterface.addColumn('UserRoles', 'roleId', {
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    ]);

    await Promise.all([
      queryInterface.addIndex('UserRoles', ['userId']),
      queryInterface.addIndex('UserRoles', ['userId', 'roleId']),
      queryInterface.addIndex('UserRoles', ['roleId']),
    ]);
  },

  down: (queryInterface) => queryInterface.dropTable('UserRoles'),
};
