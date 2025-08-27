const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/auth')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Auth routes
app.use('/api/auth', authRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});