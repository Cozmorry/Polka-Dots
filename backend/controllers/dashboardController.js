const db = require('../config/db');

// Fetch dashboard data (example for admin)
exports.getDashboardData = (req, res) => {
  const sql = 'SELECT COUNT(*) AS totalOrders FROM orders';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching dashboard data', error: err });
    }
    res.json({ totalOrders: result[0].totalOrders });
  });
};
