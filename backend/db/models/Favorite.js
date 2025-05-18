"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "user_id" });
      Favorite.belongsTo(models.Photo, {
        foreignKey: "photo_id",
        as: "Photo",
      });
    }
  }

  Favorite.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
      // tableName: "favorites",
    }
  );

  return Favorite;
};
