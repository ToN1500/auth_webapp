const express = require('express');
const router = express.Router();

// นำเข้า Controller และ Middleware ที่เกี่ยวข้อง
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/auth');

router.get('/', authMiddleware, authController.getAuthUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;