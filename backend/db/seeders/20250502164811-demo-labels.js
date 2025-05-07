"use strict";

const { Labels } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Labels.bulkCreate([
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
    await queryInterface.bulkDelete(
      { tableName: "Labels", schema: options.schema },
      null,
      {}
    );
  },
};
