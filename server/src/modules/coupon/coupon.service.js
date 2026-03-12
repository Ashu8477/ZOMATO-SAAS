const Coupon = require('./coupon.model');

const createCoupon = async (data) => {
  return await Coupon.create(data);
};

const applyCoupon = async (code, totalAmount) => {
  const coupon = await Coupon.findOne({ code });

  if (!coupon || !coupon.isActive) {
    throw new Error('Invalid coupon');
  }

  if (coupon.expiryDate < new Date()) {
    throw new Error('Coupon expired');
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    throw new Error('Coupon usage limit reached');
  }

  let discount = (totalAmount * coupon.discountPercent) / 100;

  if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }

  return {
    discount,
    finalAmount: totalAmount - discount,
    couponId: coupon._id,
  };
};

module.exports = {
  createCoupon,
  applyCoupon,
};
