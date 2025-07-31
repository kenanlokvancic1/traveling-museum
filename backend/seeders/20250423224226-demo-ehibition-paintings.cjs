'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Exhibition_Painting', [
      { exhibition_id: 1, painting_id: 1 },
      { exhibition_id: 1, painting_id: 2 },
      { exhibition_id: 1, painting_id: 7 },
      { exhibition_id: 1, painting_id: 9 },

      { exhibition_id: 2, painting_id: 3 },
      { exhibition_id: 2, painting_id: 4 },
      { exhibition_id: 2, painting_id: 10 },

      { exhibition_id: 3, painting_id: 5 },
      { exhibition_id: 3, painting_id: 6 },
      { exhibition_id: 3, painting_id: 7 },

      { exhibition_id: 4, painting_id: 5 },
      { exhibition_id: 4, painting_id: 6 },

      { exhibition_id: 5, painting_id: 10 },

      { exhibition_id: 6, painting_id: 7 },
      { exhibition_id: 6, painting_id: 9 },

      { exhibition_id: 7, painting_id: 1 },
      { exhibition_id: 7, painting_id: 4 },
      { exhibition_id: 7, painting_id: 9 },

      { exhibition_id: 8, painting_id: 3 },
      { exhibition_id: 8, painting_id: 8 },

      { exhibition_id: 9, painting_id: 9 },
      { exhibition_id: 9, painting_id: 2 },

      { exhibition_id: 10, painting_id: 10 },
      { exhibition_id: 10, painting_id: 2 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exhibition_Painting', null, {});
  }
};