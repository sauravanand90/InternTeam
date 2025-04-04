const express = require('express');
const { register, login, authMiddleware } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({
        message: 'Welcome!'
    });
});

module.exports = router;