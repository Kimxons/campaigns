# Campaign Submission Tracker

## Table of Contents

- [Campaign Submission Tracker](#campaign-submission-tracker)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [GET: Fetch Campaigns](#get-fetch-campaigns)
    - [POST: Submit Campaign Content](#post-submit-campaign-content)

---

## Overview

The **Campaign Submission Tracker** is a backend service built using Node.js and MongoDB. It allows influencers to track the campaigns they have joined and submit content (e.g., links to TikTok posts) for those campaigns.

---

## Features

- **Fetch Campaigns**: Retrieve all campaigns associated with a specific influencer.
- **Submit Content**: Allow influencers to submit campaign content by providing a link to their post.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local instance or MongoDB Atlas)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/campaign-tracker.git
   cd campaign-tracker
   ```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create .env and update the values accordingly
```bash
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

4. Start server
```bash
node server.js
```

### GET: Fetch Campaigns

```bash
GET /api/influencer/campaigns/:influencerId
```
Retrieve all campaigns associated with the given influencer ID.

Example:
```bash
curl http://localhost:5000/api/influencer/campaigns/12345
```
Response example

```bash
[
    {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k",
        "influencerId": "12345",
        "campaignName": "Feb Sale",
        "contentLink": null,
        "status": "pending",
        "createdAt": "2025-02-10T12:00:00.000Z"
    }
]
```

### POST: Submit Campaign Content

```bash
POST /api/influencer/submit/:campaignId
```
Submit content (e.g., a link to a TikTok post) for a specific campaign.

```bash
{
    "contentLink": "https://www.tiktok.com/@user/video/123456789"
}
```
```bash
curl -X POST http://localhost:5000/api/influencer/submit/64a1b2c3d4e5f6g7h8i9j0k \
-H "Content-Type: application/json" \
-d '{"contentLink": "https://www.tiktok.com/@user/video/123456789"}'

```
Response
```bash
{
    "message": "Content submitted successfully",
    "campaign": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k",
        "influencerId": "12345",
        "campaignName": "Summer Sale",
        "contentLink": "https://www.tiktok.com/@user/video/123456789",
        "status": "submitted",
        "createdAt": "2023-07-10T12:00:00.000Z"
    }
}
```