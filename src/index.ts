import { App } from '@slack/bolt';
import config from './config';
import * as _ from 'lodash';

const app = new App({
  signingSecret: config.env.signing_secret,
  token: config.env.bot_token,
});

let channel_list: any;

app.message(':wave:', async ({ message, say }) => {
  await say(`Hello`);
});

// app.event()

app.event('reaction_added', async ({ event, client }) => {
  // console.log(event);

  if (event.reaction == `bulb`) {

    // @ts-ignore
    const item = _.find(channel_list, { id: event.item.channel });

    if (_.includes(item.name, 'ideas')) return;

    const name = _.first(_.split(item.name_normalized, `-`));

    if (!name) return;

    const found = _.find(channel_list, { name: `${name}-ideas` });

    const result = await client.chat.postMessage({
      channel: item.id,
      text: `Idea moved to <#${found.id}>`,
      // @ts-ignore
      thread_ts: event.item.ts,
    });

    const full_message = await client.conversations.replies({
      channel: item.id,
      // @ts-ignore
      ts: event.item.ts,
    });

    const user = _.first(full_message.messages)?.user;
    const chat_text = _.first(full_message.messages)?.text;

    await client.chat.postMessage({
      channel: found.id,
      // @ts-ignore
      text: chat_text,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `<@${user}> had an idea!\n>${chat_text}`
          },
          "accessory": {
            "type": "image",
            image_url: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/25df9a625333b36b6f9f24f485d7b08e/large.JPG",
            "alt_text": "calendar thumbnail"
          }
        },
        {
          "type": "divider"
        },
      ],
    })

  }
  if (event.reaction == `japanese_ogre`) {

    // @ts-ignore
    const item = _.find(channel_list, { id: event.item.channel });

    if (_.includes(item.name, 'inspiration')) return;

    const name = _.first(_.split(item.name_normalized, `-`));

    if (!name) return;

    const found = _.find(channel_list, { name: `${name}-inspiration` });

    const result = await client.chat.postMessage({
      channel: item.id,
      text: `Idea moved to <#${found.id}>`,
      // @ts-ignore
      thread_ts: event.item.ts,
    });

    const full_message = await client.conversations.replies({
      channel: item.id,
      // @ts-ignore
      ts: event.item.ts,
    });

    const user = _.first(full_message.messages)?.user;
    const chat_text = _.first(full_message.messages)?.text;

    await client.chat.postMessage({
      channel: found.id,
      // @ts-ignore
      text: chat_text,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `<@${user}> had some inspiration to share!\n>${chat_text}`
          },
          "accessory": {
            "type": "image",
            image_url: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/25df9a625333b36b6f9f24f485d7b08e/large.JPG",
            "alt_text": "calendar thumbnail"
          }
        },
        {
          "type": "divider"
        },
      ],
    })

  }
  if (event.reaction == `skull_and_crossbones`) {

    // @ts-ignore
    const item = _.find(channel_list, { id: event.item.channel });

    if (_.includes(item.name, 'planning')) return;

    const name = _.first(_.split(item.name_normalized, `-`));

    if (!name) return;

    const found = _.find(channel_list, { name: `${name}-planning` });

    const result = await client.chat.postMessage({
      channel: item.id,
      text: `Idea moved to <#${found.id}>`,
      // @ts-ignore
      thread_ts: event.item.ts,
    });

    const full_message = await client.conversations.replies({
      channel: item.id,
      // @ts-ignore
      ts: event.item.ts,
    });

    const user = _.first(full_message.messages)?.user;
    const chat_text = _.first(full_message.messages)?.text;

    await client.chat.postMessage({
      channel: found.id,
      // @ts-ignore
      text: chat_text,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `<@${user}> sent this to planning!\n>${chat_text}`
          },
          "accessory": {
            "type": "image",
            image_url: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/25df9a625333b36b6f9f24f485d7b08e/large.JPG",
            "alt_text": "calendar thumbnail"
          }
        },
        {
          "type": "divider"
        },
      ],
    })

  }

});

// app.event('member_joined_channel')

// @ts-ignore
// app.event('reaction_added', async () => { console.log(`hello`); await say(`Hello`); });
/* Add functionality here */

(async () => {
  // Start the app
  await app.start(config.env.port || 3000);
  channel_list = await app.client.conversations.list();
  channel_list = channel_list.channels;
  config.log.info('⚡️ Bolt app is running!');
})();