"use strict";

const { Album, User } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const demoUser = await User.findOne({ where: { email: "demo@user.io" } });
    const user1 = await User.findOne({ where: { email: "user1@user.io" } });
    const user2 = await User.findOne({ where: { email: "user2@user.io" } });

    if (!demoUser || !user1 || !user2) {
      throw new Error("One or more demo users not found for albums seeder.");
    }

    await Album.bulkCreate([
      {
        user_id: demoUser.id,
        title: "Summer Vibes",
        description: "Summer of `24",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: demoUser.id,
        title: "Winter Wonderland",
        description: "Christmas in the mountains",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: user1.id,
        title: "Rock n Roll",
        description: "Concerts and Festivals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Albums";
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options,
      {
        title: {
          [Op.in]: ["Summer Vibes", "Winter Wonderland", "Rock n Roll"],
        },
      },
      {}
    );
  },
};
