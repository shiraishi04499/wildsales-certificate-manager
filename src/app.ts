process.env['NODE_CONFIG_DIR'] = './src/config';

import express from 'express';
import config from 'config';

const startServer = async () => {
  const app = express();
  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, (err?) => {
    if (err) {
      process.exit(1);
      return;
    }
  });
};

startServer();
