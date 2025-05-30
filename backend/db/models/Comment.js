"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Photo, { foreignKey: "photo_id" });
      Comment.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Comment.init(
    {
      photo_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
      // tableName: "comments",
    }
  );
  return Comment;
};
