const express = require('express');
const router = express.Router();

// Basic admin routes
router.get('/', (req, res) => {
    res.json({ message: 'Admin routes working' });
});

module.exports = router;
