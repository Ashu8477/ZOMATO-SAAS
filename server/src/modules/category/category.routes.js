const express = require('express');
const { addCategory, listCategories } = require('./category.controller');
const { protect, adminOnly } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/upload.middleware');

const router = express.Router();

router.get('/', listCategories);
router.post('/', protect, adminOnly, upload.single('image'), addCategory);

module.exports = router;
