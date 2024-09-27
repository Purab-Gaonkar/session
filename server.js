const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MySQL Database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'ProductDB', // Replace with your MySQL database name
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'User registration failed.' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.json({ message: 'Login successful!', user: { id: user.id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

// Dashboard route
app.get('/dashboard', async (req, res) => {
    // Example of fetching data from the database (optional)
    // const [results] = await db.query('SELECT * FROM products'); // Example query
    res.json({ message: 'Welcome to your dashboard!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
