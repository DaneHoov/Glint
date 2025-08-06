"use strict";

const { Comment, User, Photo } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Look up users by email
    const demoUser = await User.findOne({ where: { email: "demo@user.io" } });
    const user1 = await User.findOne({ where: { email: "user1@user.io" } });
    const user2 = await User.findOne({ where: { email: "user2@user.io" } });

    if (!demoUser || !user1 || !user2) {
      throw new Error("One or more required users not found.");
    }

    // Look up photos by title
    const beachPhoto = await Photo.findOne({ where: { title: "Beach sunset" } });
    const skiPhoto = await Photo.findOne({ where: { title: "Skiing adventure" } });
    const concertPhoto = await Photo.findOne({ where: { title: "Concert night" } });

    if (!beachPhoto || !skiPhoto || !concertPhoto) {
      throw new Error("One or more required photos not found.");
    }

    // Create comments
    await Comment.bulkCreate([
      {
        user_id: demoUser.id,
        photo_id: concertPhoto.id,
        content: "This concert was epic! The energy was unreal!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: user1.id,
        photo_id: beachPhoto.id,
        content: "This is a beautiful sunset!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: user2.id,
        photo_id: skiPhoto.id,
        content: "I love shredding in the fresh powder!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: user2.id,
        photo_id: concertPhoto.id,
        content: "What an amazing concert experience!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Comments";
    return queryInterface.bulkDelete(options, null, {});
  },
};
