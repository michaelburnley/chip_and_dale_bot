import { App } from '@slack/bolt';
import * as _ from 'lodash';
import config from './config';
import reaction_added from './events/reaction_added';
import endpoints from './endpoints';

const app = new App({
  signingSecret: config.env.slack.signing_secret,
  token: config.env.slack.bot_token,
});

let channel_list: any;

app.message(':wave:', async ({ message, say }) => {
  await say(`Hello`);
});

app.event('reaction_added', async ({ event, client }) => {
  await reaction_added(event, client, channel_list);
});

(async () => {
  await app.start(config.env.port || 3000);
  channel_list = await app.client.conversations.list();
  channel_list = channel_list.channels;
  config.log.info(`⚡️ Bolt app is running on port ${config.env.port}!`);

  endpoints();
})();