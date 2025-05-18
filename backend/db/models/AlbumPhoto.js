"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AlbumPhoto extends Model {
    static associate(models) {
      AlbumPhoto.belongsTo(models.Album, { foreignKey: "album_id" });
      AlbumPhoto.belongsTo(models.Photo, { foreignKey: "photo_id" });
    }
  }
  AlbumPhoto.init(
    {
      album_id: DataTypes.INTEGER,
      photo_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AlbumPhoto",
      tableName: "albumPhotos",
    }
  );
  return AlbumPhoto;
};
