const sequelize = require('../config/database');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.addToCart = async (userId, { productId, quantity = 1 }) => {
  let cart = await Cart.findOne({ where: { userId } });
  if (!cart) cart = await Cart.create({ userId });

  const product = await Product.findByPk(productId);
  if (!product || product.stockQuantity < quantity) throw new Error('Insufficient stock');

  let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    item = await CartItem.create({ cartId: cart.id, productId, quantity });
  }
  return item;
};

exports.removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ where: { userId } });
  if (!cart) throw new Error('Cart not found');

  const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
  if (!item) throw new Error('Item not found');
  return item.destroy();
};

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, include: Product }] });
  if (!cart) return { items: [], subtotal: 0, total: 0 };

  const items = cart.CartItems;
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);
  return { items, subtotal, total: subtotal };
};