"use strict";

const { User, Photo } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Favorites";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Look up users
    const demoUser = await User.findOne({ where: { email: "demo@user.io" } });
    const user1 = await User.findOne({ where: { email: "user1@user.io" } });

    // Look up photos by title
    const beach = await Photo.findOne({ where: { title: "Beach sunset" } });
    const concert = await Photo.findOne({ where: { title: "Concert night" } });

    if (!demoUser || !user1 || !beach || !concert) {
      throw new Error("Missing required seed data for favorites.");
    }

    await queryInterface.bulkInsert(options, [
      {
        user_id: demoUser.id,
        photo_id: beach.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: user1.id,
        photo_id: concert.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(options, null, {});
  },
};
