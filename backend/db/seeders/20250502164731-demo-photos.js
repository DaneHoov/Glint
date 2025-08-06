"use strict";

const { User, Photo } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the users created in the demo-user seeder
    const demoUser = await User.findOne({ where: { email: "demo@user.io" } });
    const user1 = await User.findOne({ where: { email: "user1@user.io" } });

    if (!demoUser || !user1) {
      throw new Error("Required users not found. Ensure demo-user seeder ran.");
    }

    await Photo.bulkCreate([
      {
        // id: 1,
        user_id: demoUser.id,
        image_url:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1170&q=80",
        title: "Beach sunset",
        description: "Another day in paradise",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 2,
        user_id: demoUser.id,
        image_url:
          "https://images.unsplash.com/photo-1613420365631-c588e7cac611?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Skiing adventure",
        description: "Fresh powder on the slopes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // id: 3,
        user_id: user1.id,
        image_url:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1170&q=80",
        title: "Concert night",
        description: "Encore performance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Photos";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        title: {
          [Op.in]: ["Beach sunset", "Skiing adventure", "Concert night"],
        },
      },
      {}
    );
  },
};
