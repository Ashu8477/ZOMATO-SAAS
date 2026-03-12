const express = require('express');
const { addItem, fetchCart, updateItem } = require('./cart.controller');
const { protect } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', protect, fetchCart);
router.post('/add', protect, addItem);
router.put('/update', protect, updateItem);

module.exports = router;
