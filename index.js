const express = require('express');
const path = require('path');
const authRoutes = require('./backend/routes/authRoutes');
const dashboardRoutes = require('./backend/routes/dashboardRoutes');

// Initialize the application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Serve the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/index.html'));
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
