"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Labels.belongsToMany(models.Photos, {
        through: models.PhotoLabel,
        foreignKey: "label_id",
        otherKey: "photo_id",
      });
    }
  }
  Labels.init(
    {
      // id: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Labels",
      tableName: "labels",
      underscored: true,
    }
  );
  return Labels;
};
