const express = require('express');
const router = express.Router();
const authRoutes = require('./user')

router.use('/', authRoutes)

module.exports = router