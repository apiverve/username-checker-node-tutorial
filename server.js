/**
 * Username Profanity Checker - Tutorial Example
 *
 * A simple Express server for checking if usernames contain profanity.
 * https://apiverve.com/marketplace/usernameprofanity
 */

const express = require('express');
const path = require('path');

// ============================================
// CONFIGURATION - Add your API key here
// Get a free key at: https://dashboard.apiverve.com
// ============================================
const API_KEY = process.env.API_KEY || 'your-api-key-here';
const API_URL = 'https://api.apiverve.com/v1/usernameprofanity';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static('public'));

// API endpoint to check username
app.get('/api/check', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  if (API_KEY === 'your-api-key-here') {
    return res.status(500).json({
      error: 'API key not configured. Set API_KEY environment variable or edit server.js'
    });
  }

  try {
    const response = await fetch(`${API_URL}?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY
      }
    });

    const result = await response.json();

    if (result.status === 'ok') {
      res.json({
        success: true,
        username: result.data.username,
        isProfane: result.data.isProfane
      });
    } else {
      res.status(400).json({ error: result.error || 'Check failed' });
    }
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Failed to check username' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  Username Checker running at http://localhost:${PORT}\n`);
});
