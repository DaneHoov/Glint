'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo_Labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Photo_Labels.init({
    photo_id: DataTypes.INTEGER,
    label_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo_Labels',
    tableName: 'photo_labels',
  });
  return Photo_Labels;
};
