"use strict";

const { Comment, User, Photo } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate([
      {
        user_id: 1, // Demo-lition
        photo_id: 3, // Concert night
        content: "This concert was epic! The energy was unreal!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2, // FakeUser1
        photo_id: 1, // Beach sunset
        content: "This is a beautiful sunset!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3, // FakeUser2
        photo_id: 2, // Skiing adventure
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
    options.tableName = "Comments";
    return queryInterface.bulkDelete(options, null, {});
  },
};
