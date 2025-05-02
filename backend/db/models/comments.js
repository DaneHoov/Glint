"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Photos, { foreignKey: "photo_id" });
      Comments.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Comments.init(
    {
      id: DataTypes.INTEGER,
      photo_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comments",
      tableName: "comments",
      underscored: true,
    }
  );
  return Comments;
};
