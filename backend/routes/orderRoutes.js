const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Get all orders (admin/staff access)
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdminOrStaff, orderController.getOrders);

// Update order status (staff only)
router.patch('/:orderId', authMiddleware.verifyToken, authMiddleware.isStaff, orderController.updateOrderStatus);

module.exports = router;
