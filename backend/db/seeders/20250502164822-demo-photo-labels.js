"use strict";

const { Photo, Label, PhotoLabel } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Look up photo records
    const beach = await Photo.findOne({ where: { title: "Beach sunset" } });
    const ski = await Photo.findOne({ where: { title: "Skiing adventure" } });
    const concert = await Photo.findOne({ where: { title: "Concert night" } });

    // Look up label records
    const nature = await Label.findOne({ where: { name: "Nature" } });
    const adventure = await Label.findOne({ where: { name: "Adventure" } });
    const concertLabel = await Label.findOne({ where: { name: "Concert" } });
    const travel = await Label.findOne({ where: { name: "Travel" } });

    if (
      !beach ||
      !ski ||
      !concert ||
      !nature ||
      !adventure ||
      !concertLabel ||
      !travel
    ) {
      throw new Error("Missing one or more required photos or labels.");
    }

    await PhotoLabel.bulkCreate([
      {
        photo_id: beach.id,
        label_id: nature.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: beach.id,
        label_id: travel.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: ski.id,
        label_id: nature.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: ski.id,
        label_id: adventure.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo_id: concert.id,
        label_id: concertLabel.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "PhotoLabels";
    return queryInterface.bulkDelete(options, null, {});
  },
};
