"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsTo(models.User, { foreignKey: "user_id" });
      Album.belongsToMany(models.Photo, {
        through: models.AlbumPhoto,
        foreignKey: "album_id",
        otherKey: "photo_id",
      });
    }
  }
  Album.init(
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
      modelName: "Album",
      // tableName: "albums",
    }
  );
  return Album;
};
