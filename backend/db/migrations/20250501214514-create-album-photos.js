"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: "AlbumPhotos", schema: options.schema },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        album_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "Albums", schema: options.schema },
            key: "id",
          },
          onDelete: "CASCADE",
        },
        photo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: "Photos", schema: options.schema },
            key: "id",
          },
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: "AlbumPhotos",
      schema: options.schema,
    });
  },
};
