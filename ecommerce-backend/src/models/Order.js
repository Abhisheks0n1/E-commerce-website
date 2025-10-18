const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { timestamps: true });

module.exports = Order;