import { App } from '@slack/bolt';
import config from './config';

const app = new App({
  signingSecret: config.env.signing_secret,
  token: config.env.bot_token,
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(config.env.port || 3000);

  config.log.info('⚡️ Bolt app is running!');
})();