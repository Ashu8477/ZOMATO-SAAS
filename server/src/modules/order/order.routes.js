const express = require('express');
const {
  checkout,
  myOrders,
  changeStatus,
  trackOrder,
} = require('./order.controller');
const { protect, adminOnly } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.post('/checkout', protect, checkout);
router.get('/my', protect, myOrders);
router.get('/:id', protect, trackOrder);

// admin
router.put('/:id/status', protect, adminOnly, changeStatus);

module.exports = router;
