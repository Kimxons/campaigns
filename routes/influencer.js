const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

router.get('/campaigns', authenticateToken, async (req, res) => {
    try {
        const influencerId = req.user.influencerId;
        const campaigns = await Campaign.find({ influencerId });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/submit/:campaignId', authenticateToken, async (req, res) => {
    const { campaignId } = req.params;
    const { contentLink } = req.body;

    if (!contentLink) {
        return res.status(400).json({ message: 'Content link is required' });
    }

    try {
        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        if (campaign.influencerId !== req.user.influencerId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        campaign.contentLink = contentLink;
        campaign.status = 'submitted';
        await campaign.save();

        res.status(200).json({ message: 'Content submitted successfully', campaign });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;