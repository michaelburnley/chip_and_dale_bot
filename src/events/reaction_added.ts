import * as _ from 'lodash';

const reactions: { [key: string]: any } = {
    bulb: {
        name: `ideas`,
        move_text: `Idea moved to`,
        copy_text: `had an idea!`,
        image: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/25df9a625333b36b6f9f24f485d7b08e/large.JPG"
    },
    japanese_ogre: {
        name: `inspiration`,
        move_text: `Inspiration moved to`,
        copy_text: `found some inspiration!`,
        image: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/25df9a625333b36b6f9f24f485d7b08e/large.JPG"
    },
    skull_and_crossbones: {
        name: `planning`,
        move_text: `Planning info moved to`,
        copy_text: `sent this to planning!`,
        image: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/25df9a625333b36b6f9f24f485d7b08e/large.JPG"
    },
}

export default async (event: any, client: any, channel_list: any) => {
    const reaction_inputs = reactions[event.reaction];

    if (!reaction_inputs) return;

    const item = _.find(channel_list, { id: event.item.channel });

    if (_.includes(item.name, reaction_inputs.name)) return;

    const name = _.first(_.split(item.name_normalized, `-`));

    if (!name) return;

    const found = _.find(channel_list, { name: `${name}-${reaction_inputs.name}` });

    const result = await client.chat.postMessage({
        channel: item.id,
        text: `${reaction_inputs.move_text} <#${found.id}>`,
        // @ts-ignore
        thread_ts: event.item.ts,
    });

    const full_message = await client.conversations.replies({
        channel: item.id,
        // @ts-ignore
        ts: event.item.ts,
    });

    const user = _.first(full_message.messages as any[])?.user as string;
    const chat_text = _.first(full_message.messages as any[])?.text as string;

    await client.chat.postMessage({
        channel: found.id,
        // @ts-ignore
        text: chat_text,
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `<@${user}> ${reaction_inputs.copy_text}\n>${chat_text}`
                },
                "accessory": {
                    "type": "image",
                    image_url: reaction_inputs.image,
                    "alt_text": "calendar thumbnail"
                }
            },
            {
                "type": "divider"
            },
        ],
    })

}