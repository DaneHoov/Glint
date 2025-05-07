"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photos.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });

      Photos.hasMany(models.Comments, {
        foreignKey: "photo_id",
        onDelete: "CASCADE",
      });

      Photos.hasMany(models.Favorites, {
        foreignKey: "photo_id",
        onDelete: "CASCADE",
      });

      Photos.belongsToMany(models.Albums, {
        through: models.AlbumPhotos,
        foreignKey: "photo_id",
        otherKey: "album_id",
      });

      Photos.belongsToMany(models.Labels, {
        through: models.PhotoLabels,
        foreignKey: "photo_id",
        otherKey: "label_id",
      });
    }
  }
  Photos.init(
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
      modelName: "Photos",
      tableName: "photos",
    }
  );
  return Photos;
};
