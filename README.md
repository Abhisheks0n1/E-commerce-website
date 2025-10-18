 🛒 E-Commerce Project

A full-stack E-Commerce Web Application with complete backend and frontend setup.



 ⚙️ Tech Stack

Backend: Node.js, Express.js, Sequelize MySQL
Frontend: React.js (Create React App)
Auth: JWT (JSON Web Token)
Database: SQL 



 🧩 Folder Structure


project/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── app.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    ├── .env
    └── package.json




 🚀 Backend Setup

# 1. Install Dependencies

bash
cd backend
npm install


# 2. Create `.env` file

Example:


DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
PORT=3000


# 3. Run Server

bash
node src/app.js


Backend will start on [http://localhost:3000](http://localhost:3000)



 🔗 Backend API Endpoints

# 🧍 Authentication

| Method | Endpoint             | Description                                       |
|  | -- | - |
| POST   | `/api/auth/register` | Register user `{username, password, role?}`       |
| POST   | `/api/auth/login`    | Login user `{username, password}` → returns token |

# 🛍️ Products

| Method | Endpoint                                                            | Description                                              |
|  | - | -- |
| GET    | `/api/products?page=1&limit=10&category=1&priceMin=10&priceMax=100` | Get filtered products                                    |
| GET    | `/api/products/:id`                                                 | Get product details                                      |
| POST   | `/api/products` (admin only)                                        | Add new product `{name, desc, price, stock, categoryId}` |
| PUT    | `/api/products/:id` (admin only)                                    | Update product                                           |
| DELETE | `/api/products/:id` (admin only)                                    | Delete product                                           |

# 🛒 Cart

| Method | Endpoint                      | Description                                 |
|  | -- | - |
| POST   | `/api/cart/add`               | Add product to cart `{productId, quantity}` |
| DELETE | `/api/cart/remove/:productId` | Remove product from cart                    |
| GET    | `/api/cart`                   | Get cart items with subtotal and total      |

# 📦 Orders

| Method | Endpoint                   | Description            |
|  | -- | - |
| POST   | `/api/orders/place`        | Place new order        |
| GET    | `/api/orders/history`      | Get user order history |
| GET    | `/api/orders` (admin only) | Get all orders         |



 🧠 Backend Notes

* Layered Architecture: Controllers → Services → Models
* Sequelize ORM handles database queries and relationships
* Transactions are used when placing orders
* Authentication with JWT
* No guest carts (login required for cart & orders)



 💻 Frontend Setup

# 1. Install Dependencies

bash
cd frontend
npm install


# 2. Create `.env` file

Example:


REACT_APP_API_URL=http://localhost:3000/api


# 3. Run Frontend

bash
npm start


Frontend will start on [http://localhost:3001](http://localhost:3001) (or another available port).



 🌐 Frontend Overview

* Fully connected to backend APIs
* Supports login, product listing, cart, and order placement
* Uses JWT token from backend for authentication
* Simple and responsive layout for all devices



 ✅ Features Summary

* 🔐 JWT-based Authentication
* 🛍️ Product Listing & Filtering
* 🛒 Cart Management
* 💳 Order Placement
* 🧾 Order History
* ⚙️ Admin Controls for Product & Order Management



 🧪 Example Test Flow

1. Register → Login → Copy Token
2. Add product (Admin)
3. View products (User)
4. Add to cart → Place order
5. Check order history

👨‍💻 Author

Abhishek Soni
Full Stack Developer — MERN / Flutter / Firebase / Node.js / React

