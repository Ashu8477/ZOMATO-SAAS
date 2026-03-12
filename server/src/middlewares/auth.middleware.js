const jwt = require('jsonwebtoken');
const User = require('../modules/auth/auth.model');
const ApiError = require('../utils/ApiError');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = await User.findById(decoded.id).select(
      '-password -refreshToken',
    );

    if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized');
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin only');
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
};
