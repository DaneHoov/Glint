"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhotoLabels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhotoLabels.belongsTo(models.Photos, { foreignKey: "photo_id" });
      PhotoLabels.belongsTo(models.Labels, { foreignKey: "label_id" });
    }
  }
  PhotoLabels.init(
    {
      photo_id: DataTypes.INTEGER,
      label_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PhotoLabels",
      tableName: "photolabels",
    }
  );
  return PhotoLabels;
};
