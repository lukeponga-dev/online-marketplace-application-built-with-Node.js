# Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Folder Structure](#folder-structure)
3. [Files and Their Functions](#files-and-their-functions)
4. [Usage](#usage)
   - [Setting Up the Project](#setting-up-the-project)
   - [Running the Application](#running-the-application)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

This documentation provides an overview of the Online Marketplace project, including its folder structure, file functions, and usage instructions.

## Folder Structure

```
.
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   └── productController.js
├── middleware
│   └── authMiddleware.js
├── models
│   └── user.js
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   ├── app.js
│   │   └── auth.js
│   ├── login.html
│   └── register.html
├── routes
│   ├── auth.js
│   ├── checkout.js
│   └── products.js
├── app.js
├── package.json
└── README.md
```

## Files and Their Functions

- `app.js`: The main entry point of the application. It sets up the Express server, includes middleware, and defines routes.
- `config/db.js`: Contains the configuration for connecting to the MongoDB database.
- `controllers/authController.js`: Handles user authentication, including login and registration.
- `controllers/productController.js`: Handles product-related operations, such as retrieving products.
- `middleware/authMiddleware.js`: Middleware for protecting routes that require authentication.
- `models/user.js`: Defines the User schema for MongoDB.
- `public/css/styles.css`: Contains the CSS styles for the client-side.
- `public/js/app.js`: Handles client-side functionality, such as fetching products and adding them to the cart.
- `public/js/auth.js`: Handles client-side authentication, such as login and registration.
- `public/login.html` and `public/register.html`: Client-side HTML files for user login and registration.
- `routes/auth.js`, `routes/checkout.js`, and `routes/products.js`: Define the routes for authentication, checkout, and products, respectively.
- `package.json`: Contains project metadata and dependencies.
- `README.md`: Provides an overview of the project and instructions for setting it up and running it.

## Usage

### Setting Up the Project

1. Clone the repository:

```bash
git clone https://github.com/yourusername/online-marketplace.git
```

2. Install dependencies:

```bash
cd online-marketplace
npm install
```

3. Set up your MongoDB connection and JWT secret in a `.env` file.

### Running the Application

1. Start the server:

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)