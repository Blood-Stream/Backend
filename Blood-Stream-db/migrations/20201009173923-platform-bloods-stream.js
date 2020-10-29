/* 'use strict';
const tableName = 'plataformGames';
const constraintName = 'platformGames_platformGameId_fkey';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`alter table "${tableName}" drop constraint "${constraintName}"`)
      .then(() => queryInterface.sequelize.query(
        `alter table "${tableName}"
          add constraint "${constraintName}" foreign key("platformGameId") references "property_service" ("id")
          on delete cascade`
      ));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`alter table "${tableName}" drop constraint "${constraintName}"`)
      .then(() => queryInterface.sequelize.query(
        `alter table "${tableName}"\
          add constraint "${constraintName}" foreign key("platformGameId") references "property_service" ("id")
          on delete no action`
      ));
  },
};
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'platformGames',
        'platformGames_platformGameId_fkey',
        { transaction }
      );
      await queryInterface.addConstraint('users', ['address_id'], {
        type: 'foreign key',
        name: 'platformGames_platformGameId_fkey',
        references: {
          table: 'platforms',
          field: 'id',
        },
        onDelete: 'CASCADE',
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'users',
        'users_address_id_fkey',
        { transaction }
      );
      await queryInterface.addConstraint('users', ['address_id'], {
        type: 'foreign key',
        name: 'users_address_id_fkey',
        references: {
          table: 'addresses',
          field: 'id',
        },
        transaction
      });
      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};