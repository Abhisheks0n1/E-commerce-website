const sequelize = require('../config/database');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.placeOrder = async (userId) => {
  return sequelize.transaction(async (t) => {
    let cart = await Cart.findOne({ where: { userId }, transaction: t });
    if (!cart) throw new Error('Cart not found');
    
    const items = await CartItem.findAll({ 
      where: { cartId: cart.id }, 
      include: [Product],
      transaction: t 
    });
    
    if (!items.length) throw new Error('Cart empty');
    
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);
    const order = await Order.create({ userId, totalPrice }, { transaction: t });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.Product.price,
      }, { transaction: t });
      
      await Product.update(
        { stockQuantity: item.Product.stockQuantity - item.quantity }, 
        { where: { id: item.productId }, transaction: t }
      );
    }

    await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });
    return order;
  });
};

exports.getOrderHistory = async (userId) => {
  return Order.findAll({ 
    where: { userId }, 
    include: [{ 
      model: OrderItem, 
      include: [Product] 
    }],
    order: [['createdAt', 'DESC']]
  });
};

exports.getAllOrders = async () => {
  return Order.findAll({ 
    include: [{ 
      model: OrderItem, 
      include: [Product] 
    }]
  });
};