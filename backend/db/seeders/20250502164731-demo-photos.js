"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("photos", [
      {
        userId: 1,
        url: "https://unsplash.com/photos/white-and-black-car-on-brown-sand-during-daytime-wtBex4wQw60",
        title: "Beach sunset",
        description: "car shoot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        url: "https://unsplash.com/photos/a-man-riding-skis-down-a-snow-covered-slope-A7OE4Rxk0qA",
        title: "Skiing adventure",
        description: "Fresh powder on the slopes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        url: "https://unsplash.com/photos/stage-light-front-of-audience-NYrVisodQ2M",
        title: "Concert night",
        description: "encore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
