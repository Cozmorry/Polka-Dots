const db = require('../config/db');

// Fetch all orders
exports.getOrders = (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching orders', error: err });
    }
    res.json({ orders: results });
  });
};

// Update order status
exports.updateOrderStatus = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(sql, [status, orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating order status', error: err });
    }
    res.json({ message: 'Order status updated successfully' });
  });
};
