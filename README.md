# Username Profanity Checker | APIVerve API Tutorial

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000)](https://expressjs.com)
[![APIVerve | Username Profanity](https://img.shields.io/badge/APIVerve-Username_Profanity-purple)](https://apiverve.com/marketplace/usernameprofanity?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial)

A Node.js web app for checking if usernames contain profanity. Perfect for user registration flows and community platforms.

![Screenshot](https://raw.githubusercontent.com/apiverve/username-checker-node-tutorial/main/screenshot.jpg)

---

### Get Your Free API Key

This tutorial requires an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial)** - no credit card required.

---

## Features

- Check usernames for inappropriate content
- Real-time validation feedback
- Visual safe/profane indicators
- Example usernames to test
- Clean, modern UI
- Built with Express.js

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/apiverve/username-checker-node-tutorial.git
   cd username-checker-node-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**

   Set environment variable or edit `server.js`:
   ```bash
   export API_KEY=your-api-key-here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**

   Visit http://localhost:3000 and check usernames!

## Project Structure

```
username-checker-node-tutorial/
├── server.js           # Express server & API endpoint
├── public/
│   └── index.html      # Frontend UI
├── package.json        # Dependencies
├── screenshot.jpg      # Preview image
├── LICENSE             # MIT license
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## How It Works

1. User enters a username
2. Frontend sends GET request to `/api/check`
3. Server calls the Username Profanity API
4. API analyzes the username
5. Frontend displays safe/profane result

### The API Call

```javascript
const response = await fetch(`https://api.apiverve.com/v1/usernameprofanity?username=${username}`, {
  method: 'GET',
  headers: {
    'x-api-key': API_KEY
  }
});
```

## API Reference

**Endpoint:** `GET https://api.apiverve.com/v1/usernameprofanity`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | The username to check |

**Example Response:**

```json
{
  "status": "ok",
  "error": null,
  "data": {
    "username": "cooluser123",
    "isProfane": false
  }
}
```

## Use Cases

- **User Registration** - Validate usernames during signup
- **Gaming Platforms** - Enforce appropriate gamertags
- **Social Media** - Screen display names
- **Forums** - Moderate community usernames
- **Chat Apps** - Filter inappropriate handles
- **E-commerce** - Validate seller/buyer names

## Customization Ideas

- Add batch checking for multiple usernames
- Suggest alternative usernames when profane
- Add username availability checking
- Integrate with signup forms
- Store checked usernames in database
- Add admin dashboard for moderation

## Related APIs

Explore more APIs at [APIVerve](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial):

- [Profanity Filter](https://apiverve.com/marketplace/profanityfilter?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial) - Filter profanity from text
- [Email Validator](https://apiverve.com/marketplace/emailvalidator?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial) - Validate email addresses
- [Username Generator](https://apiverve.com/marketplace/usernamegenerator?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial) - Generate usernames

## License

MIT - see [LICENSE](LICENSE)

## Links

- [Get API Key](https://dashboard.apiverve.com?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial) - Sign up free
- [APIVerve Marketplace](https://apiverve.com/marketplace?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial) - Browse 300+ APIs
- [Username Profanity API](https://apiverve.com/marketplace/usernameprofanity?utm_source=github&utm_medium=tutorial&utm_campaign=username-checker-node-tutorial) - API details
