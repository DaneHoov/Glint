"use strict";

const { Comments } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Comments.bulkCreate([
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
