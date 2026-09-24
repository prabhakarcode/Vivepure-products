# VIVEPANYA E-Mart — Modern E-Commerce Platform

VIVEPANYA E-mart Private Ltd. is a modern full-stack e-commerce web application for handcrafted herbal soaps, cold-pressed virgin coconut oil, and personal care wellness products.

---

## 1. Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Context API
- **Backend:** Node.js, Express.js REST API
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs password hashing
- **Database:** Dual engine:
  - Built-in Persistent JSON database (`data/store.json`) with auto-seeding
  - MongoDB / MongoDB Atlas integration via `MONGODB_URI`
- **Architecture:** Unified Express server with Vite middleware in development and static asset serving in production.

---

## 2. Default Accounts & Admin Credentials

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@vivepanya.com` | `admin123` | Full control: Product creation/editing/deletion, Stock adjustment, Order status lifecycle, Sales metrics |
| **Verified Customer** | `customer@vivepanya.com` | `password123` | Shopping cart, Checkout, Order placement, Order history tracking |

*(You can also use the 1-Click Demo buttons on the Login modal to sign in instantly without typing).*

---

## 3. Step-by-Step Setup Instructions

### Step 1: Install Dependencies
In the root directory of the project, execute:
```bash
npm install
```

### Step 2: Configure Environment & MongoDB
Copy the example environment configuration:
```bash
cp .env.example .env
```
In `.env`, configure your settings:
```env
PORT=3000
JWT_SECRET=vivepanya_super_secret_jwt_key_2026

# Optional: MongoDB connection string (leave unset to use built-in store)
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vivepanya?retryWrites=true&w=majority
```

#### Running MongoDB Locally (Optional)
If you prefer running a local MongoDB instance with Docker:
```bash
docker run -d -p 27017:27017 --name mongodb-vivepanya mongo:latest
```
Set `MONGODB_URI="mongodb://localhost:27017/vivepanya_emart"` in your `.env`.

### Step 3: Run the Complete Application (Dev Server)
To start both the backend API and frontend Vite server together:
```bash
npm run dev
```
Open your browser at:
```
http://localhost:3000
```

### Step 4: Build for Production Deployment
To generate production builds:
```bash
# 1. Build the frontend client bundle into /dist
npm run build

# 2. Run the production server
npm run start
```

---

## 4. REST API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new customer
- `POST /api/auth/login` — Login and receive JWT token

### Products
- `GET /api/products` — Retrieve all products (Supports queries: `search`, `category`, `minPrice`, `maxPrice`, `minRating`, `sort`)
- `GET /api/products/:id` — Retrieve single product details
- `POST /api/products` — (Admin) Add new product
- `PUT /api/products/:id` — (Admin) Update product details or stock
- `DELETE /api/products/:id` — (Admin) Delete a product

### Categories
- `GET /api/categories` — Retrieve all collections
- `POST /api/categories` — (Admin) Create category

### Orders
- `POST /api/orders` — Place order and generate unique Order ID (`VP-2026-XXXX`)
- `GET /api/orders` — Retrieve user orders or all orders for admin
- `GET /api/orders/:id` — Retrieve specific order details
- `PUT /api/orders/:id/status` — (Admin) Advance order status (`Pending` -> `Confirmed` -> `Packed` -> `Shipped` -> `Out for Delivery` -> `Delivered`)
- `PUT /api/orders/:id/cancel` — Cancel an order with reason

### Reviews
- `GET /api/reviews/:productId` — Fetch reviews for product
- `POST /api/reviews` — Submit verified customer review

### Admin Analytics
- `GET /api/admin/stats` — Summary metrics (Sales, Orders, Users, Low Stock)
- `GET /api/admin/customers` — List registered customers

---

## 5. Discount Coupons
Try these test coupons during checkout:
- `VIVE10`: 10% discount on any order
- `WELCOME20`: 20% discount on order
- `FLAT100`: ₹100 flat discount on orders over ₹500
