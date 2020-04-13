'use strict';
const bcrypt = require('bcryptjs')
const SALT = bcrypt.genSaltSync(10)
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'PLEASE ENTER VALID EMAIL FORMAT'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['user', 'admin']],
          msg: 'MUST BE USER OR ADMIN'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = bcrypt.hashSync(instance.password, SALT)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};