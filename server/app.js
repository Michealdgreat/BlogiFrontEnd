const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

const JWT_SECRET = 'hffj0dj)@%46fgadv%H@*HE^@HE*@fg084vaqf2@3@H$5fet';
const API_BASE_URL = 'http://localhost:5115';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
        const token = response.data;
        res.json(token);
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Banner Ad Routes
app.get('/api/banner-ads', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/banner-ads`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch banner ads' });
    }
});

app.post('/api/create-banner-ad', verifyToken, async (req, res) => {
    try {
        await axios.post(`${API_BASE_URL}/api/banner-ads`, req.body);
        res.status(201).json({ message: 'Banner ad created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create banner ad' });
    }
});

app.delete('/api/delete-banner-ad/:bannerId', verifyToken, async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/banner-ads/${req.params.bannerId}`);
        res.json({ message: 'Banner ad deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete banner ad' });
    }
});

// Carousel Banner Routes
app.get('/api/carousel-banners', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/carousel-banners`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carousel banners' });
    }
});

app.post('/api/create-carousel-banner', verifyToken, async (req, res) => {
    try {
        await axios.post(`${API_BASE_URL}/api/carousel-banners`, req.body);
        res.status(201).json({ message: 'Carousel banner created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create carousel banner' });
    }
});

app.delete('/api/delete-carousel-banner/:carouselId', verifyToken, async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/carousel-banners/${req.params.carouselId}`);
        res.json({ message: 'Carousel banner deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete carousel banner' });
    }
});

// Category Routes
app.get('/api/categories', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/categories`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

app.post('/api/create-category', verifyToken, async (req, res) => {
    try {
        await axios.post(`${API_BASE_URL}/api/categories`, req.body);
        res.status(201).json({ message: 'Category created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

app.delete('/api/delete-category/:categoryId', verifyToken, async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/categories/${req.params.categoryId}`);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// Post Routes
app.get('/api/posts', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/posts`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.post('/api/create-post', verifyToken, async (req, res) => {
    try {
        await axios.post(`${API_BASE_URL}/api/posts`, req.body);
        res.status(201).json({ message: 'Post created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.delete('/api/delete-post/:postId', verifyToken, async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/posts/${req.params.postId}`);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Role Routes
app.get('/api/roles', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/roles`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});

app.post('/api/create-role', verifyToken, async (req, res) => {
    try {
        await axios.post(`${API_BASE_URL}/api/roles`, req.body);
        res.status(201).json({ message: 'Role created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create role' });
    }
});

// User Routes
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/api/create-user', verifyToken, async (req, res) => {
    try {
        await axios.post(`${API_BASE_URL}/api/users`, req.body);
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.delete('/api/delete-user/:userId', verifyToken, async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/users/${req.params.userId}`);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Serve React App with a named wildcard
app.get('/*path', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});