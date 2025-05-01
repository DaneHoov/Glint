'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album_Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Album_Photos.init({
    album_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album_Photos',
  });
  return Album_Photos;
};