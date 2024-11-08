# **Marketplace Application Documentation**

## **Table of Contents**

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Environment Configuration](#environment-configuration)
5. [API Documentation](#api-documentation)
   - [Authentication Endpoints](#authentication-endpoints)
   - [Product Endpoints](#product-endpoints)
   - [Order Endpoints](#order-endpoints)
6. [Frontend Pages and Functionality](#frontend-pages-and-functionality)
7. [Styling and Assets](#styling-and-assets)
8. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
9. [Future Enhancements](#future-enhancements)
10. [Contributing](#contributing)
11. [License](#license)

---

## **Introduction**

The Marketplace Application is a full-stack web application that connects vendors and buyers, allowing vendors to list products and buyers to purchase them. This documentation provides comprehensive details on setting up, using, and maintaining the application.

---

## **Project Structure**

The project is divided into two main directories: `frontend` and `backend`. Each part has its own structure and files.

### **Backend Structure**

```
backend/
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── config/
│   └── db.js
├── .env
├── app.js
├── package.json
└── package-lock.json
```

### **Frontend Structure**

```
frontend/
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── vendor_dashboard.html
│   ├── buyer_dashboard.html
│   ├── product_details.html
│   ├── cart.html
│   ├── css/
│   │   ├── styles.css
│   │   └── vendor.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── vendor.js
│   │   ├── buyer.js
│   │   ├── products.js
│   │   └── cart.js
│   └── assets/
│       ├── images/
│       │   └── logo.png
│       └── fonts/
└── package.json
```

---

## **Setup Instructions**

### **Backend Setup**

1. **Navigate to the `backend` Directory:**

   ```bash
   cd marketplace/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the `backend` directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/marketplace
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Backend Server:**

   ```bash
   npm start
   ```

   The backend server should be running at `http://localhost:5000`.

### **Frontend Setup**

1. **Navigate to the `frontend` Directory:**

   ```bash
   cd marketplace/frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend Server:**

   ```bash
   npx live-server public/
   ```

   The frontend should be running at `http://localhost:8080`.

---

## **Environment Configuration**

### **.env File**

The `.env` file contains environment variables required for the application. Ensure that the `.env` file is added to your `.gitignore` to prevent committing sensitive information.

**Example:**

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/marketplace
JWT_SECRET=your_jwt_secret_key
```

---

## **API Documentation**

### **Authentication Endpoints**

#### **Register User**

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user (vendor or buyer).
- **Request Body:**

  ```json
  {
    "username": "string",
    "password": "string",
    "role": "vendor|buyer"
  }
  ```

- **Response:**

  ```json
  {
    "message": "User registered successfully",
    "role": "string"
  }
  ```

#### **Login User**

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- **Response:**

  ```json
  {
    "message": "User logged in successfully",
    "role": "string"
  }
  ```

#### **Logout User**

- **URL:** `/auth/logout`
- **Method:** `GET`
- **Description:** Logs out the user.
- **Response:**

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

### **Product Endpoints**

#### **Get All Products**

- **URL:** `/products`
- **Method:** `GET`
- **Description:** Retrieves all products.
- **Response:**

  ```json
  [
    {
      "_id": "string",
      "name": "string",
      "price": "number",
      "description": "string",
      "vendor": {
        "_id": "string",
        "username": "string"
      }
    }
  ]
  ```

#### **Add Product**

- **URL:** `/products/add`
- **Method:** `POST`
- **Description:** Adds a new product (vendor-only).
- **Request Body:**

  ```json
  {
    "name": "string",
    "price": "number",
    "description": "string"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Product added successfully",
    "product": {
      "_id": "string",
      "name": "string",
      "price": "number",
      "description": "string",
      "vendor": "string"
    }
  }
  ```

#### **Get Vendor Products**

- **URL:** `/products/vendor`
- **Method:** `GET`
- **Description:** Retrieves products listed by the logged-in vendor.
- **Response:**

  ```json
  [
    {
      "_id": "string",
      "name": "string",
      "price": "number",
      "description": "string",
      "vendor": "string"
    }
  ]
  ```

---

### **Order Endpoints**

#### **Create Order**

- **URL:** `/orders/create`
- **Method:** `POST`
- **Description:** Creates a new order (buyer-only).
- **Request Body:**

  ```json
  {
    "items": [
      {
        "product": "string",
        "quantity": "number"
      }
    ],
    "totalAmount": "number"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Order created successfully",
    "order": {
      "_id": "string",
      "buyer": "string",
      "items": [
        {
          "product": "string",
          "quantity": "number"
        }
      ],
      "totalAmount": "number",
      "status": "string"
    }
  }
  ```

#### **Get Buyer Orders**

- **URL:** `/orders/buyer`
- **Method:** `GET`
- **Description:** Retrieves orders made by the logged-in buyer.
- **Response:**

  ```json
  [
    {
      "_id": "string",
      "buyer": "string",
      "items": [
        {
          "product": "string",
          "quantity": "number"
        }
      ],
      "totalAmount": "number",
      "status": "string"
    }
  ]
  ```

---

## **Frontend Pages and Functionality**

### **Home Page (`index.html`)**

- **Description:** Displays a list of available products.
- **Functionality:** Fetches products from `/products` endpoint and displays them.

### **Login Page (`login.html`)**

- **Description:** Allows users to log in.
- **Functionality:** Submits login data to `/auth/login` endpoint.

### **Register Page (`register.html`)**

- **Description:** Allows new users to create an account.
- **Functionality:** Submits registration data to `/auth/register` endpoint.

### **Vendor Dashboard (`vendor_dashboard.html`)**

- **Description:** Allows vendors to manage their products.
- **Functionality:** 
 