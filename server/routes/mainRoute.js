const express = require('express');
const app =express();
const router = express.Router();
const userRoutes = require('./userRoutes')
const adminRoutes = require('./AdminRoute')
const spotRoutes = require('./spotRoutes')

router.use("/user",userRoutes);
router.use("/admin",adminRoutes)
router.use("/spots",spotRoutes)

module.exports = router;