module.exports = {
  apps: [{
    name: 'frontend',
    cwd: __dirname,
    script: 'http-server',
    args: 'build -p 3000 --push-state --silent --cache 3600',
    env: {
      NODE_ENV: 'production',
    },
    instances: 1,
    autorestart: true,
    watch: false,
  }],
};
