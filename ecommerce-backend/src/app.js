require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);

async function initApp() {

  
  const User = require('./models/User');
  const Category = require('./models/Category');
  const Product = require('./models/Product');
  const Cart = require('./models/Cart');
  const CartItem = require('./models/CartItem');
  const Order = require('./models/Order');
  const OrderItem = require('./models/OrderItem');
  
  User.hasOne(Cart, { foreignKey: 'userId' });
  Cart.belongsTo(User, { foreignKey: 'userId' });
  
  Category.hasMany(Product, { foreignKey: 'categoryId' });
  Product.belongsTo(Category, { foreignKey: 'categoryId' });
  
  Cart.hasMany(CartItem, { foreignKey: 'cartId' });
  CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
  CartItem.belongsTo(Product, { foreignKey: 'productId' });
  
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });
  
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
  
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

initApp().catch(err => console.error(' FATAL:', err));