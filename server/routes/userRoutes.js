const express = require('express');
const router = express.Router();

// Basic user routes
router.get('/', (req, res) => {
    res.json({ message: 'User routes working' });
});

module.exports = router;
