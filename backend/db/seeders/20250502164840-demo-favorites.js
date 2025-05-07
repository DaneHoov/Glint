"use strict";

const { Favorites } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Favorites.bulkCreate([
      {
        user_id: 1,
        photo_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        photo_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        photo_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        photo_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { tableName: "Favorites", schema: options.schema },
      null,
      {}
    );
  },
};
