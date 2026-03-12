const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const {
  createOrder,
  getMyOrders,
  updateOrderStatus,
} = require('./order.service');
const { getOrderById } = require('./order.service');

const trackOrder = asyncHandler(async (req, res) => {
  const order = await getOrderById(req.params.id, req.user._id);

  res.status(200).json(new ApiResponse(200, order, 'Order fetched'));
});

const checkout = asyncHandler(async (req, res) => {
  const order = await createOrder(req.user._id, req.body.deliveryAddress);

  res
    .status(201)
    .json(new ApiResponse(201, order, 'Order placed successfully'));
});

const myOrders = asyncHandler(async (req, res) => {
  const orders = await getMyOrders(req.user._id);

  res.status(200).json(new ApiResponse(200, orders, 'Orders fetched'));
});

const changeStatus = asyncHandler(async (req, res) => {
  const order = await updateOrderStatus(req.params.id, req.body.status);

  res.status(200).json(new ApiResponse(200, order, 'Order status updated'));
});

module.exports = {
  checkout,
  myOrders,
  changeStatus,
  trackOrder,
};
