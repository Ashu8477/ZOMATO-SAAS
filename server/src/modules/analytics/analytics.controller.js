const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { getDashboardStats } = require('./analytics.service');

const dashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats();

  res.status(200).json(new ApiResponse(200, stats, 'Dashboard stats fetched'));
});

module.exports = {
  dashboardStats,
};
