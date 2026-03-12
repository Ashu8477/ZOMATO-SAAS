const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { registerUser, loginUser } = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, result, 'User registered successfully'));
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

module.exports = {
  register,
  login,
};
