const express = require('express');
const { dashboardStats } = require('./analytics.controller');
const { protect, adminOnly } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/dashboard', protect, adminOnly, dashboardStats);

module.exports = router;
