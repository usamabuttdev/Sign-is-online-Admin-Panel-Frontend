const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (mounted directly, no proxy needed)
app.use('/auth', require('./server/routes/auth'));
app.use('/admin', require('./server/routes/users'));
app.use('/admin', require('./server/routes/dashboard'));
app.use('/admin/faqs', require('./server/routes/faqs'));

const { adminRouter: bookingsAdmin, publicRouter: bookingsPublic } = require('./server/routes/bookings');
app.use('/admin/bookings', bookingsAdmin);
app.use('/bookings', bookingsPublic);

const adminRouter = require('./server/routes/admin');
app.use('/admin', adminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin', require('./server/routes/customers'));
app.use('/api/admin', require('./server/routes/accounts'));
app.use('/api/admin', require('./server/routes/charges'));
app.use('/api/admin', require('./server/routes/locations'));
app.use('/api/admin', require('./server/routes/platforms'));
app.use('/api/admin', require('./server/routes/admin-products'));
app.use('/api/admin', require('./server/routes/metrics'));

app.use('/specializations', require('./server/routes/specializations'));
app.use('/training-modes', require('./server/routes/trainingModes'));
app.use('/languages', require('./server/routes/languages'));
app.use('/settings', require('./server/routes/settings'));
app.use('/transactions', require('./server/routes/transactions'));
app.use('/upload', require('./server/routes/upload'));
app.use('/communications', require('./server/routes/communications'));
app.use('/products', require('./server/routes/productViews'));
app.use('/products', require('./server/routes/productMetrics'));
app.use('/products', require('./server/routes/products'));
app.use('/sales', require('./server/routes/sales'));
app.use('/trainers', require('./server/routes/trainers'));

// Diagnostics (no auth required)
app.get('/diagnostics', async (req, res) => {
  const results = { mssql: { connect: false, query: false } };
  try {
    const devDb = require('./server/services/dev-db');
    await devDb.getPool();
    results.mssql.connect = true;
    try {
      const q = await devDb.query('SELECT 1 AS ok');
      results.mssql.query = q.rows.length > 0;
    } catch (e) {
      results.mssql.queryError = e.message;
    }
  } catch (e) {
    results.mssql.connectError = e.message;
  }
  res.json({ success: true, data: results });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy!' });
});

// Serve static files with SPA fallback
const BUILD_DIR = path.join(__dirname, 'build');
app.use(express.static(BUILD_DIR));
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
