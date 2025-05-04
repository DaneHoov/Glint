"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Comments", [
      {
        user_id: 1,
        photo_id: 3,
        content: "This concert was epic! The energy was unreal!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        photo_id: 1,
        content: "This is a beautiful sunset!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        photo_id: 2,
        content: "I love shredding in the fresh powder!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        photo_id: 3,
        content: "What an amazing concert experience!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
