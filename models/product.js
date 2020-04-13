'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {}
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'NAME REQUIRED'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'Lorem Ipsum'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'CATEGORY REQUIRED'
        },
        isIn: {
          args: [['prescription', 'otc', 'otc_limited', 'herbal']],
          msg: 'PLEASE ENTER VALID DRUG CATEGORY'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'PRICE REQUIRED'
        },
        min: {
          args: [0],
          msg: 'PRICE MUST BE NON-NEGATIVE'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'STOCK REQUIRED'
        },
        min: {
          args: [0],
          msg: 'STOCK MUST BE NON-NEGATIVE'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product'
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};