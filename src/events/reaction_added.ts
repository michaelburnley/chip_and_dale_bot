import * as _ from 'lodash';
import config from '../config';

export default async (event: any, client: any) => {
    const reaction = await config.sequelize.models.SlackEmoji.findOne({ where: { id: event.reaction }, raw: true }) as any;
    if (!reaction) return;

    const item = await config.sequelize.models.SlackChannel.findOne({
        where: {
            id: event.item.channel,
        },
        raw: true
    }) as any;

    if (item.id === reaction.channelId) return;

    const full_message = await client.conversations.replies({
        channel: item.id,
        // @ts-ignore
        ts: event.item.ts,
    });

    const chat_text = _.first(full_message.messages as any[])?.text as string;
    const original_link = await client.chat.getPermalink({ channel: item.id, message_ts: event.item.ts })

    const response = await client.chat.postMessage({
        channel: reaction.channelId,
        unfurl_links: false,
        unfurl_media: false,
        // @ts-ignore
        text: chat_text,
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `<@${event.user}> ${reaction.copyText}\n>${chat_text}`
                },
                accessory: {
                    type: "image",
                    image_url: reaction.image,
                    alt_text: "calendar thumbnail"
                }
            },
            {
                "type": "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `<${original_link.permalink}|Original conversation>`
                },
            },
        ],
    })

    const new_link = await client.chat.getPermalink({ channel: response.channel, message_ts: response.ts })

    await client.chat.postMessage({
        channel: event.item.channel,
        unfurl_links: false,
        unfurl_media: false,
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `${reaction.moveText} <#${reaction.channelId}>. New link is <${new_link.permalink}|here>.`
                }
            }
        ],
        // @ts-ignore
        thread_ts: event.item.ts,
    });

}