const express = require('express');
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, isAdmin, productController.createProduct);
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;