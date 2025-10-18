const cartService = require('../services/cartService');

exports.addToCart = async (req, res, next) => {
  try {
    const cartItem = await cartService.addToCart(req.user.id, req.body);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    await cartService.removeFromCart(req.user.id, req.params.productId);
    res.json({ message: 'Item removed' });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};