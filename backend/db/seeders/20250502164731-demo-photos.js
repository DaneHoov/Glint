"use strict";

const { Photos } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Photos.bulkCreate([
      {
        user_id: 1,
        image_url:
          "https://unsplash.com/photos/white-and-black-car-on-brown-sand-during-daytime-wtBex4wQw60",
        title: "Beach sunset",
        description: "car shoot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        image_url:
          "https://unsplash.com/photos/a-man-riding-skis-down-a-snow-covered-slope-A7OE4Rxk0qA",
        title: "Skiing adventure",
        description: "Fresh powder on the slopes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        image_url:
          "https://unsplash.com/photos/stage-light-front-of-audience-NYrVisodQ2M",
        title: "Concert night",
        description: "encore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { tableName: "photos", schema: options.schema },
      null,
      {}
    );
  },
};
