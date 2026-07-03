module.exports = {
  apps: [{
    name: 'frontend',
    cwd: __dirname,
    script: 'node_modules/.bin/serve',
    args: '-s build -l 3000',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};