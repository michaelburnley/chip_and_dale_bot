import { App } from '@slack/bolt';
import config from './config';
import reaction_added from './events/reaction_added';
import endpoints from './endpoints';
import syncModels from './config/syncModels';
import syncChannels from './helpers/syncChannels';

const app = new App({
  signingSecret: config.env.slack.signing_secret,
  token: config.env.slack.bot_token,
});

app.message(':wave:', async ({ message, say }) => {
  await say(`Hello`);
});

app.event('reaction_added', async ({ event, client }) => {
  await reaction_added(event, client);
});

(async () => {
  await app.start(config.env.port || 3000);
  config.log.info(`⚡️ Bolt app is running on port ${config.env.port}!`);
  endpoints();

  try {
    await config.sequelize.authenticate();
    config.log.info('⚡️ Connection to DB successful!');
    syncModels();
    syncChannels(app.client);
  } catch (error) {
    config.log.error(`Unable to connect to the database: ${error}`);
  }
})();