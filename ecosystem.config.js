module.exports = {
  apps: [{
    name: 'frontend',
    cwd: __dirname,
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      API_TARGET: 'http://localhost:5000',
    },
    instances: 1,
    autorestart: true,
    watch: false,
  }],
};
