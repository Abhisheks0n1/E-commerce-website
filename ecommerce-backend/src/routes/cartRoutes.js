const express = require('express');
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:productId', verifyToken, cartController.removeFromCart);
router.get('/', verifyToken, cartController.getCart);

module.exports = router;