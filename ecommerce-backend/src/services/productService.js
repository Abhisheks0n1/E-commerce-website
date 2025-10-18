const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.createProduct = async (data) => Product.create(data);

exports.updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product.update(data);
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product.destroy();
};

exports.listProducts = async ({ page, limit, category, priceMin, priceMax }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (category) where.categoryId = category;
  if (priceMin) where.price = { [Op.gte]: priceMin };
  if (priceMax) where.price = { ...where.price, [Op.lte]: priceMax };
  return Product.findAndCountAll({ where, limit, offset });
};

exports.getProductById = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product;
};