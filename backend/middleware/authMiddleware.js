const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.protect = (req, res, next) => {
  const token = req.cookies.token || '';

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
