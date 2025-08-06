"use strict";

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Users"; // capitalized for actual table name

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        firstName: "Demo",
        lastName: "Lition",
        hashedPassword: bcrypt.hashSync("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user1@user.io",
        username: "FakeUser1",
        firstName: "Fake",
        lastName: "UserOne",
        hashedPassword: bcrypt.hashSync("password2"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user2@user.io",
        username: "FakeUser2",
        firstName: "Fake",
        lastName: "UserTwo",
        hashedPassword: bcrypt.hashSync("password3"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"],
      },
    });
  },
};

