const orderService = require('../services/orderService');

exports.placeOrder = async (req, res, next) => {
  try {
    const order = await orderService.placeOrder(req.user.id);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const orders = await orderService.getOrderHistory(req.user.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};