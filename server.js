const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_TARGET = process.env.API_TARGET || 'http://localhost:5000';

const BUILD_DIR = path.join(__dirname, 'build');

// Proxy API calls to the backend
const apiProxy = createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
});

app.use('/admin', apiProxy);
app.use('/auth', apiProxy);
app.use('/api', apiProxy);
app.use('/health', apiProxy);
app.use('/specializations', apiProxy);
app.use('/training-modes', apiProxy);
app.use('/languages', apiProxy);
app.use('/settings', apiProxy);
app.use('/transactions', apiProxy);
app.use('/upload', apiProxy);
app.use('/communications', apiProxy);
app.use('/products', apiProxy);
app.use('/sales', apiProxy);
app.use('/trainers', apiProxy);

// Serve static files with SPA fallback
app.use(express.static(BUILD_DIR));
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, proxying API to ${API_TARGET}`);
});
