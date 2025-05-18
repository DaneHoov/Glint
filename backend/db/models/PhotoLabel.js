"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhotoLabel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhotoLabel.belongsTo(models.Photo, { foreignKey: "photo_id" });
      PhotoLabel.belongsTo(models.Label, { foreignKey: "label_id" });
    }
  }
  PhotoLabel.init(
    {
      photo_id: DataTypes.INTEGER,
      label_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PhotoLabel",
      tableName: "photoLabels",
    }
  );
  return PhotoLabel;
};
