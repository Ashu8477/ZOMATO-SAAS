const express = require('express');
const { paymentIntent, paymentVerify } = require('./payment.controller');
const { protect } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/intent/:orderId', protect, paymentIntent);
router.post('/verify/:orderId', protect, paymentVerify);

module.exports = router;
