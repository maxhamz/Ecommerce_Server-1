'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'EMAIL TAKEN'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'PLEASE ENTER VALID EMAIL FORMAT'
        },
        notNull: {
          args: true,
          msg: 'EMAIL REQUIRED'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'PASSWORD REQUIRED'
        },
        len: {
          args: [6],
          msg: 'PASSWORD MUST BE AT LEAST 6 CHARACTERS'
        }
      }
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ROLE REQUIRED'
        },
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
        instance.password = hashPassword(instance.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};