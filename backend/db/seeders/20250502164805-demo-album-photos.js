"use strict";

const { Album, Photo, AlbumPhoto } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Find albums by title
    const summerVibes = await Album.findOne({
      where: { title: "Summer Vibes" },
    });
    const winterWonderland = await Album.findOne({
      where: { title: "Winter Wonderland" },
    });
    const rockNRoll = await Album.findOne({ where: { title: "Rock n Roll" } });

    // Find photos by title
    const beachSunset = await Photo.findOne({
      where: { title: "Beach sunset" },
    });
    const skiingAdventure = await Photo.findOne({
      where: { title: "Skiing adventure" },
    });
    const concertNight = await Photo.findOne({
      where: { title: "Concert night" },
    });

    if (
      !summerVibes ||
      !winterWonderland ||
      !rockNRoll ||
      !beachSunset ||
      !skiingAdventure ||
      !concertNight
    ) {
      throw new Error(
        "Required albums or photos not found for AlbumPhoto seeder."
      );
    }

    await AlbumPhoto.bulkCreate([
      {
        album_id: summerVibes.id,
        photo_id: beachSunset.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        album_id: winterWonderland.id,
        photo_id: skiingAdventure.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        album_id: rockNRoll.id,
        photo_id: concertNight.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "AlbumPhotos";
    return queryInterface.bulkDelete(options, null, {});
  },
};
