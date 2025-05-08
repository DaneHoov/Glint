"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AlbumPhotos extends Model {
    static associate(models) {
      AlbumPhotos.belongsTo(models.Albums, { foreignKey: "album_id" });
      AlbumPhotos.belongsTo(models.Photos, { foreignKey: "photo_id" });
    }
  }
  AlbumPhotos.init(
    {
      album_id: DataTypes.INTEGER,
      photo_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AlbumPhotos",
      tableName: "Albumphotos",
    }
  );
  return AlbumPhotos;
};
