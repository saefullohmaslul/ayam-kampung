module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Roles',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          allowNull: false,
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

    await queryInterface.addIndex('Roles', ['name']);
  },

  down: (queryInterface) => queryInterface.dropTable('Roles'),
};
