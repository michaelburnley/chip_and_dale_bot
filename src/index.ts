import config from './config';
import reaction_added from './events/reaction_added';
import endpoints from './endpoints';
import syncModels from './helpers/syncModels';
import syncChannels from './helpers/syncChannels';
import syncNotionDB from './helpers/syncNotionDB';
import syncNotionDBProps from './helpers/syncNotionDBProps';
import app from './config/globals/bolt';

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
    await syncNotionDB();
    await syncNotionDBProps();

  } catch (error) {
    config.log.error(`Unable to connect to the database: ${error}`);
  }
})();