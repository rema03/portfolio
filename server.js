import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets from project root and directories
app.use(express.static(__dirname));
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
  if (req.body.website) {
    console.log('Spam bot detected and blocked.');
    return res.status(200).json({ success: true, message: 'Message sent' });
  }

  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyBlgsErLA-emK3XyyCEqdgQ0bfolncqB4QBLqj4p_cYzu-TiywJtjkCNHJcvI36YeK/exec';
  
  try {
    // Forward the original body to Google Apps Script
    const params = new URLSearchParams(req.body);
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    res.status(200).json({ success: true, message: 'Message forwarded successfully' });
  } catch (error) {
    console.error('Error forwarding contact message:', error);
    res.status(500).json({ success: false, error: 'Failed to forward message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
