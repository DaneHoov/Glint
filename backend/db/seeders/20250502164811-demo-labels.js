"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Labels", [
      {
        name: "Nature",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adventure",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Concert",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Travel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Labels", null, {});
  },
};
