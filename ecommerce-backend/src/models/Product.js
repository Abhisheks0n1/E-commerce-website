const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stockQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  categoryId: { type: DataTypes.INTEGER },
}, { timestamps: true });

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;