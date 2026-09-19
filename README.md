# Username Checker | APIVerve Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933)](package.json)
[![Express](https://img.shields.io/badge/Express-4-000000)](package.json)
[![APIVerve | Username Profanity](https://img.shields.io/badge/APIVerve-Username_Profanity-purple)](https://apiverve.com/marketplace/usernameprofanity?utm_source=github&utm_medium=template&utm_campaign=username-checker-node-tutorial)

Stop offensive usernames at signup. Type a username and see whether it contains profanity, including words hidden inside it like `dumbass77`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fapiverve%2Fusername-checker-node-tutorial&project-name=username-checker&repository-name=username-checker&env=APIVERVE_API_KEY&envDescription=Your%20APIVerve%20API%20key.%20Free%20to%20create%2C%20no%20card%20needed.&envLink=https%3A%2F%2Fdashboard.apiverve.com%2Fsignup%3Fapi%3Dusernameprofanity%26utm_source%3Dvercel%26utm_medium%3Dtemplate%26utm_campaign%3Dusername-checker-node-tutorial)

![Username Checker flagging an offensive username](https://raw.githubusercontent.com/apiverve/username-checker-node-tutorial/main/screenshot.png)

---

### Get your free API key

This template needs an APIVerve API key. **[Sign up free](https://dashboard.apiverve.com/signup?api=usernameprofanity&utm_source=github&utm_medium=template&utm_campaign=username-checker-node-tutorial)**, no credit card required.

---

## Deploy in one click

Click **Deploy with Vercel** above. Vercel copies this repo to your GitHub account, asks for your `APIVERVE_API_KEY`, and gives you a live URL about a minute later.

## Run it locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/apiverve/username-checker-node-tutorial.git
   cd username-checker-node-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and set `APIVERVE_API_KEY`.

4. **Start the server**
   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:3000`

## How it works

1. The page in `public/index.html` calls `GET /api/check?username=` on this server.
2. `server.js` checks the input, then calls Username Profanity. Your API key stays on the server and never reaches the browser.
3. The page shows the result.

```
├── server.js            # Express: the /api route that calls APIVerve
├── public/index.html    # The page (HTML, CSS and JavaScript)
├── .env.example         # Copy to .env and add your key
└── package.json
```

### The API call

```javascript
const res = await fetch(
  `https://api.apiverve.com/v1/usernameprofanity?username=${encodeURIComponent(username)}`,
  { headers: { 'x-api-key': process.env.APIVERVE_API_KEY } }
);
const { data } = await res.json();
// data.isProfane → true or false
```

## Before you share your URL

Once deployed, anyone who finds your URL can use it on your API key. Each visitor can make 10 requests a minute, which is fine for a demo. The limit is kept in memory, so it isn't shared between serverless instances. For production:

- Put the page behind your own sign-in, or
- Move the limit to a shared store such as [Upstash Redis](https://upstash.com/), or
- Call the route only from your own backend.

## Ideas to extend it

- Check usernames live as people type, before they submit
- Run the same check on display names and team names
- Add [Profanity Filter](https://apiverve.com/marketplace/profanityfilter?utm_source=github&utm_medium=template&utm_campaign=username-checker-node-tutorial) to mask words in bios and comments

## API reference

- [Username Profanity](https://apiverve.com/marketplace/usernameprofanity?utm_source=github&utm_medium=template&utm_campaign=username-checker-node-tutorial): `GET https://api.apiverve.com/v1/usernameprofanity?username=`
- [Full documentation](https://docs.apiverve.com?utm_source=github&utm_medium=template&utm_campaign=username-checker-node-tutorial)

## Tech stack

- **Node.js 20+** and **Express 4**
- Plain HTML, CSS and JavaScript, no build step
- Deploys to Vercel as-is: `server.js` becomes one function and `public/` is served from the CDN

## License

MIT. See [LICENSE](LICENSE).
