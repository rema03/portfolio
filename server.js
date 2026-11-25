import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;
const CONTACT_RECIPIENT = process.env.CONTACT_EMAIL_TO || 'user@jimindev.com';
const CONTACT_SCRIPT_URL =
  process.env.GOOGLE_CONTACT_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyBlgsErLA-emK3XyyCEqdgQ0bfolncqB4QBLqj4p_cYzu-TiywJtjkCNHJcvI36YeK/exec';

const contactRateLimit = new Map();

function checkContactRateLimit(ip, maxAttempts = 5, windowMs = 60 * 1000) {
  const now = Date.now();
  const entry = contactRateLimit.get(ip);
  if (!entry || now - entry.windowStart > windowMs) {
    if (contactRateLimit.size >= 2000) {
      const oldest = contactRateLimit.keys().next().value;
      if (oldest !== undefined) contactRateLimit.delete(oldest);
    }
    contactRateLimit.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= maxAttempts) {
    return false;
  }
  entry.count += 1;
  return true;
}

// Middleware
app.use(express.urlencoded({ extended: true, limit: '32kb' }));
app.use(express.json({ limit: '32kb' }));

// Serve only public and frontend src directories (never expose server.js/package.json/Dockerfile)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'main.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'main.html'));
});

app.post('/api/contact', async (req, res) => {
  // Honeypot check: If the hidden 'website' field is filled out, it's a bot.
  if (req.body && req.body.website) {
    console.log('Spam bot detected and blocked.');
    return res.status(200).json({ success: true, message: 'Message sent' });
  }

  const clientIp = req.ip || 'unknown';
  if (!checkContactRateLimit(clientIp)) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' });
  }

  const nickname = typeof req.body?.nickname === 'string' ? req.body.nickname.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!nickname || nickname.length > 100) {
    return res.status(400).json({ success: false, error: 'Invalid nickname' });
  }
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email' });
  }
  if (!message || message.length > 5000) {
    return res.status(400).json({ success: false, error: 'Invalid message' });
  }

  try {
    const params = new URLSearchParams({
      nickname,
      email,
      message,
      emailTo: CONTACT_RECIPIENT,
      to: CONTACT_RECIPIENT,
    });
    const response = await fetch(CONTACT_SCRIPT_URL, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error('Google Apps Script returned error:', response.status);
      return res.status(502).json({ success: false, error: 'Failed to forward message' });
    }

    res.status(200).json({ success: true, message: 'Message forwarded successfully' });
  } catch (error) {
    console.error('Error forwarding contact message:', error);
    res.status(500).json({ success: false, error: 'Failed to forward message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
