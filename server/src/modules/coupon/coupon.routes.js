const express = require('express');
const { addCoupon, apply } = require('./coupon.controller');
const { protect, adminOnly } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protect, adminOnly, addCoupon);
router.post('/apply', protect, apply);

module.exports = router;
