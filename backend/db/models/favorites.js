"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorites.belongsTo(models.User, { foreignKey: "user_id" });
      Favorites.belongsTo(models.Photos, { foreignKey: "photo_id" });
    }
  }
  Favorites.init(
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
      modelName: "Favorites",
      tableName: "Favorites",
    }
  );
  return Favorites;
};
