const express = require('express');
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/place', verifyToken, orderController.placeOrder);
router.get('/history', verifyToken, orderController.getOrderHistory);
router.get('/', verifyToken, isAdmin, orderController.getAllOrders);

module.exports = router;