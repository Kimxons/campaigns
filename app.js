const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors  = require('cors');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const influencerRoutes = require('./routes/influencer');
const authRoutes = require('./routes/authRoutes');

app.use('/api/influencer', influencerRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

module.exports = app;