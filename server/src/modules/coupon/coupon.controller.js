const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { createCoupon, applyCoupon } = require('./coupon.service');

const addCoupon = asyncHandler(async (req, res) => {
  const coupon = await createCoupon(req.body);

  res.status(201).json(new ApiResponse(201, coupon, 'Coupon created'));
});

const apply = asyncHandler(async (req, res) => {
  const result = await applyCoupon(req.body.code, req.body.totalAmount);

  res.status(200).json(new ApiResponse(200, result, 'Coupon applied'));
});

module.exports = {
  addCoupon,
  apply,
};
