'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
    },
    total_price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: [0],
          msg: 'Minimum Checkout Price is 1'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Order'
  });
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User)
    Order.belongsTo(models.Product)
  };
  return Order;
};