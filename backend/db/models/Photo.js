"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });

      Photo.hasMany(models.Comment, {
        foreignKey: "photo_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      Photo.hasMany(models.Favorite, {
        foreignKey: "photo_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      Photo.belongsToMany(models.Album, {
        through: models.AlbumPhoto,
        foreignKey: "photo_id",
        otherKey: "album_id",
        onDelete: "CASCADE",
        hooks: true,
      });

      Photo.belongsToMany(models.Label, {
        through: models.PhotoLabel,
        foreignKey: "photo_id",
        otherKey: "label_id",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Photo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Photo",
      // tableName: "photos",
    }
  );
  return Photo;
};
