const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const foodRoutes = require('../modules/food/food.routes');
const categoryRoutes = require('../modules/category/category.routes');
const cartRoutes = require('../modules/cart/cart.routes');
const orderRoutes = require('../modules/order/order.routes');
const paymentRoutes = require('../modules/payment/payment.routes');
const analyticsRoutes = require('../modules/analytics/analytics.routes');
const couponRoutes = require('../modules/coupon/coupon.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/foods', foodRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/coupons', couponRoutes);

module.exports = router;
