'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: 'Minimum Checkout Qty is 1'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart'
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};