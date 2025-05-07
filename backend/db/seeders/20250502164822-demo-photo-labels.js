"use strict";

const { PhotoLabels } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await PhotoLabels.bulkCreate([
      {
        photo_id: 1, // Beach sunset
        label_id: 1, // Nature
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: 1, // Beach sunset
        label_id: 4, // Travel
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: 2, // Skiing adventure
        label_id: 1, // Nature
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: 2, // Skiing adventure
        label_id: 2, // Adventure
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: 3, // Concert night
        label_id: 3, // Concert
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { tableName: "PhotoLabels", schema: options.schema },
      null,
      {}
    );
  },
};
