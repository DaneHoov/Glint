"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Albums.belongsTo(models.User, { foreignKey: "user_id" });
      Albums.belongsToMany(models.Photos, {
        through: models.AlbumPhotos,
        foreignKey: "album_id",
        otherKey: "photo_id",
      });
    }
  }
  Albums.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Albums",
      tableName: "Albums",
    }
  );
  return Albums;
};
