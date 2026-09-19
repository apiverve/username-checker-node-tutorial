/**
 * Username Checker, an APIVerve template.
 *
 * Checks a username for profanity before someone can claim it.
 * The API key stays on the server: the browser only ever talks to /api routes.
 *
 * Username Profanity: https://apiverve.com/marketplace/usernameprofanity
 */

const express = require('express');
const path = require('path');

// Set APIVERVE_API_KEY in .env (local) or your host's environment variables.
// Get a free key at https://dashboard.apiverve.com
const API_KEY = process.env.APIVERVE_API_KEY;
const PORT = process.env.PORT || 3000;

// ============================================
// Rate limit
// Once deployed, anyone who finds this URL can call it with YOUR key.
// This caps each visitor at RATE_LIMIT requests per minute. It is kept in
// memory, so it resets on cold starts and isn't shared between instances:
// good enough for a demo. For production, use a shared store (e.g. Upstash
// Redis) or put the app behind your own auth.
// ============================================
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

/** Calls an APIVerve API and returns its data, or throws with its error message. */
async function callApi(api, { query, body } = {}) {
  const url = `https://api.apiverve.com/v1/${api}${query ? `?${new URLSearchParams(query)}` : ''}`;
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { 'x-api-key': API_KEY, ...(body && { 'Content-Type': 'application/json' }) },
    body: body && JSON.stringify(body)
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.status !== 'ok') {
    const err = json?.error;
    const message = err?.missing ? `Missing: ${err.missing.join(', ')}` : typeof err === 'string' ? err : `APIVerve returned ${res.status}`;
    throw Object.assign(new Error(message), { status: res.status === 429 ? 429 : 502 });
  }
  return json.data;
}

/** A trimmed string, capped at max characters. */
const str = (v, max) => String(v ?? '').trim().slice(0, max);

const app = express();
app.use(express.json({ limit: '10kb' }));
// Serves the page locally. On Vercel, public/ is served from the CDN instead.
app.use(express.static(path.join(__dirname, 'public')));

// Every /api route needs the key, and counts against the visitor's limit.
app.use('/api', (req, res, next) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'Missing APIVERVE_API_KEY. Add it to .env, or to your host’s environment variables, then restart.' });
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'local';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Wait a minute and try again.' });
  }
  next();
});

// GET /api/check?username=
app.get('/api/check', async (req, res) => {
  const username = str(req.query.username, 64);
  if (!username) return res.status(400).json({ error: 'Enter a username.' });

  try {
    const data = await callApi('usernameprofanity', { query: { username } });
    res.json({ success: true, username: data.username, isProfane: data.isProfane });
  } catch (err) {
    res.status(err.status || 502).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Username Checker running at http://localhost:${PORT}`);
});
