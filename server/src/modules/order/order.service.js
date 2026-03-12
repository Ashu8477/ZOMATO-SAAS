const Order = require('./order.model');
const Cart = require('../cart/cart.model');

const createOrder = async (userId, address) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const order = await Order.create({
    user: userId,
    items: cart.items,
    totalAmount: cart.totalAmount,
    deliveryAddress: address,
  });

  // clear cart after order
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();

  return order;
};

const getMyOrders = async (userId) => {
  return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

module.exports = {
  createOrder,
  getMyOrders,
};
const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  order.orderStatus = status;
  await order.save();

  return order;
};

module.exports.updateOrderStatus = updateOrderStatus;
const getOrderById = async (orderId, userId) => {
  return await Order.findOne({
    _id: orderId,
    user: userId,
  });
};

module.exports.getOrderById = getOrderById;
