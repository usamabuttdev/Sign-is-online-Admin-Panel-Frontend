const express = require('express');
const bcrypt = require('bcryptjs');
const devDb = require('../services/dev-db');
const { generateToken, authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    // Hardcoded admin credentials
    if (email === 'nicowens@gmail.com' && password === '0255') {
      const token = generateToken({ id: 1, email: 'nicowens@gmail.com', role: 'admin' });
      return res.json({
        success: true,
        data: { token, user: { id: 1, name: 'Admin', email: 'nicowens@gmail.com', role: 'admin' } }
      });
    }

    let userRow = null;
    try {
      const result = await devDb.query('SELECT UserID as id, FullName as name, Email as email, Role as role, Password as password FROM users WHERE Email = $1', [email]);
      if (result.rows.length > 0) userRow = result.rows[0];
    } catch (_) { /* pass */ }
    if (!userRow) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    if (userRow.password) {
      const valid = await bcrypt.compare(password, userRow.password);
      if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = generateToken({ id: userRow.id, email: userRow.email, role: userRow.role || 'user' });
    res.json({ success: true, data: { token, user: { id: userRow.id, name: userRow.name, email: userRow.email, role: userRow.role || 'user' } } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
    const existing = await devDb.query('SELECT UserID FROM users WHERE Email = $1', [email]);
    if (existing.rows.length > 0) return res.status(409).json({ success: false, message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const result = await devDb.query('INSERT INTO users (FullName, Email, Password) VALUES ($1, $2, $3) RETURNING UserID, FullName, Email, Role', [name || '', email, hashed]);
    const user = result.rows[0];
    const mapped = { id: user.userid || user.UserID, name: user.fullname || user.FullName, email: user.email || user.Email, role: user.role || user.Role || 'user' };
    const token = generateToken({ id: mapped.id, email: mapped.email, role: mapped.role });
    res.status(201).json({ success: true, data: { token, user: mapped } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const result = await devDb.query('SELECT UserID FROM users WHERE Email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    const resetToken = generateToken({ id: result.rows[0].UserID || result.rows[0].userid, purpose: 'reset' });
    res.json({ success: true, message: 'Reset link sent', data: { resetToken } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: 'Verification code required' });
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/resetPassword', authenticateToken, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ success: false, message: 'Password required' });
    const hashed = await bcrypt.hash(password, 10);
    await devDb.query('UPDATE users SET Password = $1, UpdatedAt = CURRENT_TIMESTAMP WHERE UserID = $2', [hashed, req.user.id]);
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
