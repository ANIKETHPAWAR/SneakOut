const express = require('express');
const app =express();
const router = express.Router();
const userRoutes = require('./userRoutes')
const adminRoutes = require('./AdminRoute')
router.use("/user",userRoutes);
router.use("/admin",adminRoutes)

module.exports = router;