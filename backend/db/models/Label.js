"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Label.belongsToMany(models.Photo, {
        through: "PhotoLabels",
        foreignKey: "label_id",
        otherKey: "photo_id",
      });
    }
  }
  Label.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Label",
      // tableName: "labels",
    }
  );
  return Label;
};
