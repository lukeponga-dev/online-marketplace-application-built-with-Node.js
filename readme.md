# Online Marketplace

This is a full-stack online marketplace application built with Node.js, Express.js, and React. It allows users to browse products, add them to their cart, and checkout. User authentication and role-based access control are implemented, allowing users to create accounts and vendors to add products.

## Features

- Browse products
- Add products to cart
- User registration and login
- Server-side authentication
- Role-based access control (user and vendor roles)
- Vendors can add new products

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

### Frontend

- React
- React Router
- Redux (for state management)
- Axios (for HTTP requests)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/online-marketplace.git
```
## 2. Install backend dependencies:   
```bash
cd online-marketplace/backend
npm install
```
## 3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```
## 4. Set up environment variables:

- Create a `.env` file in the `backend` directory and add the following variables:  
```        
MONGO_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your_jwt_secret_key
```
- Replace your_jwt_secret_key with a secure secret key for JSON Web Token (JWT) authentication.

## 5. Start the backend server:</b>
```bash
cd ../backend
npm start
```

## 6. Start the frontend development server:</b>

```bash
cd ../frontend
npm start
```

## 7. Open your browser and visit http://localhost:3000 to access the application.</b>

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
[MIT License](https://opensource.org/licenses/MIT)

This README provides an overview of the project, its features, and the technologies used. It also includes instructions for setting up the project locally, including installing dependencies, setting up environment variables, and running both the backend and frontend servers.
Additionally, it includes a section for contributing guidelines and a link to the project's license.
Feel free to modify this README as needed to fit your project's specific requirements and add any additional sections or information that might be relevant.