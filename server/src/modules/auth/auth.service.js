const User = require('./auth.model');
const ApiError = require('../../utils/ApiError');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../services/token.service');

const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create(data);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  user.password = undefined;
  user.refreshToken = undefined;

  return { user, accessToken, refreshToken };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  user.password = undefined;
  user.refreshToken = undefined;

  return { user, accessToken, refreshToken };
};

module.exports = {
  registerUser,
  loginUser,
};
