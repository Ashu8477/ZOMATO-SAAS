const Order = require('../order/order.model');

const createPaymentIntent = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  if (order.paymentStatus === 'paid') {
    throw new Error('Already paid');
  }

  // simulation intent
  return {
    orderId: order._id,
    amount: order.totalAmount,
    currency: 'INR',
  };
};

const verifyPayment = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  order.paymentStatus = 'paid';
  await order.save();

  return order;
};

module.exports = {
  createPaymentIntent,
  verifyPayment,
};
