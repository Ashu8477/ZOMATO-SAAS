const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { createPaymentIntent, verifyPayment } = require('./payment.service');

const paymentIntent = asyncHandler(async (req, res) => {
  const intent = await createPaymentIntent(req.params.orderId);

  res.status(200).json(new ApiResponse(200, intent, 'Payment intent created'));
});

const paymentVerify = asyncHandler(async (req, res) => {
  const order = await verifyPayment(req.params.orderId);

  res.status(200).json(new ApiResponse(200, order, 'Payment verified'));
});

module.exports = {
  paymentIntent,
  paymentVerify,
};
