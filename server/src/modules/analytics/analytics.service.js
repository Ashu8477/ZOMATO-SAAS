const Order = require('../order/order.model');

const getDashboardStats = async () => {
  const totalOrders = await Order.countDocuments();

  const totalRevenueAgg = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const pendingOrders = await Order.countDocuments({
    orderStatus: { $in: ['pending', 'confirmed', 'preparing'] },
  });

  const deliveredOrders = await Order.countDocuments({
    orderStatus: 'delivered',
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRevenueAgg = await Order.aggregate([
    {
      $match: {
        paymentStatus: 'paid',
        createdAt: { $gte: today },
      },
    },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  return {
    totalOrders,
    totalRevenue: totalRevenueAgg[0]?.total || 0,
    pendingOrders,
    deliveredOrders,
    todayRevenue: todayRevenueAgg[0]?.total || 0,
  };
};

module.exports = {
  getDashboardStats,
};
