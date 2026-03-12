const express = require('express');
const { addFood, listFoods } = require('./food.controller');
const { protect, adminOnly } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/upload.middleware');
const { menuGrouped } = require('./food.controller');

const router = express.Router();

router.get('/', listFoods);
router.post('/', protect, adminOnly, upload.single('image'), addFood);
router.get('/menu', menuGrouped);

module.exports = router;
