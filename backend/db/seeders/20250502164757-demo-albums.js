"use strict";

const { Albums } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Albums.bulkCreate([
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
