"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Albums", [
      {
        user_id: 1,
        title: "Summer Vibes",
        description: "Summer of `24",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        title: "Winter Wonderland",
        description: "Christmas in the mountains",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        title: "Rock n Roll",
        description: "Concerts and Festivals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Albums", null, {});
  },
};
