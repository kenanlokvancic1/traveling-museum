const path = require('path');

module.exports = {
  config: path.resolve('./config', 'config.js'),
  models: path.resolve('models'),
  migrations: path.resolve('migrations'),
  seeders: path.resolve('seeders')
};
