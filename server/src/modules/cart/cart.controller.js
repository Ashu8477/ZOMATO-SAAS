const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { addToCart, getCart, updateCartItem } = require('./cart.service');

const addItem = asyncHandler(async (req, res) => {
  const cart = await addToCart(
    req.user._id,
    req.body.foodId,
    req.body.quantity || 1,
  );

  res.status(200).json(new ApiResponse(200, cart, 'Item added to cart'));
});

const fetchCart = asyncHandler(async (req, res) => {
  const cart = await getCart(req.user._id);

  res.status(200).json(new ApiResponse(200, cart, 'Cart fetched'));
});

const updateItem = asyncHandler(async (req, res) => {
  const cart = await updateCartItem(
    req.user._id,
    req.body.foodId,
    req.body.quantity,
  );

  res.status(200).json(new ApiResponse(200, cart, 'Cart updated'));
});

module.exports = {
  addItem,
  fetchCart,
  updateItem,
};
