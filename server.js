const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const http = require('http');

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

// Diagnostic page (must be before SPA catch-all)
app.get('/__diag', async (req, res) => {
  const lines = [];
  function log(msg) { lines.push(msg); }

  log(`<!DOCTYPE html><html><body style="font-family:monospace;padding:20px">`);
  log(`<h2>Proxy Diagnostic</h2>`);
  log(`<p><b>API_TARGET:</b> <code>${API_TARGET}</code></p>`);
  log(`<p><b>PORT:</b> <code>${PORT}</code></p>`);
  log(`<p><b>NODE_ENV:</b> <code>${process.env.NODE_ENV || 'not set'}</code></p>`);
  log(`<hr>`);

  // Test 1: Request via proxy (through frontend server)
  log(`<h3>Test 1: Request via proxy</h3>`);
  log(`<p>URL: <code>/admin/all-users?page=1&limit=1</code></p>`);
  try {
    const result = await fetchWithTimeout(`http://localhost:${PORT}/admin/all-users?page=1&limit=1`, {
      headers: { Authorization: 'Bearer 1234567890' },
    }, 8000);
    log(`<p>Status: <code>${result.status}</code></p>`);
    log(`<p>Content-Type: <code>${result.headers['content-type'] || 'N/A'}</code></p>`);
    log(`<p>Body (first 300 chars):</p>`);
    log(`<pre>${escapeHtml(result.body.substring(0, 300))}</pre>`);
  } catch (e) {
    log(`<p style="color:red">ERROR: ${e.message}</p>`);
  }

  // Test 2: Direct request to backend
  log(`<hr><h3>Test 2: Direct request to backend</h3>`);
  log(`<p>URL: <code>${API_TARGET}/admin/all-users?page=1&limit=1</code></p>`);
  try {
    const result = await fetchWithTimeout(`${API_TARGET}/admin/all-users?page=1&limit=1`, {
      headers: { Authorization: 'Bearer 1234567890' },
    }, 8000);
    log(`<p>Status: <code>${result.status}</code></p>`);
    log(`<p>Content-Type: <code>${result.headers['content-type'] || 'N/A'}</code></p>`);
    log(`<p>Body (first 300 chars):</p>`);
    log(`<pre>${escapeHtml(result.body.substring(0, 300))}</pre>`);
  } catch (e) {
    log(`<p style="color:red">ERROR: ${e.message}</p>`);
  }

  // Test 3: No-auth request (should get 401)
  log(`<hr><h3>Test 3: No-auth request via proxy</h3>`);
  log(`<p>URL: <code>/admin/all-users?page=1&limit=1</code> (no Authorization header)</p>`);
  try {
    const result = await fetchWithTimeout(`http://localhost:${PORT}/admin/all-users?page=1&limit=1`, {}, 8000);
    log(`<p>Status: <code>${result.status}</code></p>`);
    log(`<p>Body:</p>`);
    log(`<pre>${escapeHtml(result.body.substring(0, 200))}</pre>`);
  } catch (e) {
    log(`<p style="color:red">ERROR: ${e.message}</p>`);
  }

  log(`</body></html>`);
  res.type('html').send(lines.join('\n'));
});

function fetchWithTimeout(url, options, timeout) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(timeout, () => { req.destroy(); reject(new Error(`Timeout after ${timeout}ms`)); });
  });
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Serve static files with SPA fallback
app.use(express.static(BUILD_DIR));
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, proxying API to ${API_TARGET}`);
});
