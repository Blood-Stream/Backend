'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'games', // table name
        'Rating', // new field name
        {
          type: Sequelize.INTEGER, 
          allowNull: true,
        }
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('games', 'Rating'),
    ]);
  },
}

