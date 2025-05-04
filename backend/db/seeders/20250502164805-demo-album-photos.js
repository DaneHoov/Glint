"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AlbumPhotos", [
      {
        album_id: 1, // Summer Vibes
        photo_id: 1, // Beach sunset
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        album_id: 2, // Winter Wonderland
        photo_id: 2, // fresh powder on the slopes
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        album_id: 3, // Concert Memories
        photo_id: 3, // encore
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AlbumPhotos", null, {});
  },
};
