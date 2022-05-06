import app from "../config/globals/bolt";
import * as moment from 'moment';
import * as _ from 'lodash';

const possible_gifs = [
    "https://media.giphy.com/media/5fMlYckytHM4g/giphy.gif",
    "https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif",
    "https://media.giphy.com/media/rRGMu2D3QV2cU/giphy.gif",
    "https://media.giphy.com/media/12f7G788sA9wBi/giphy.gif",
    "https://media.giphy.com/media/IyFBbg97qPN3q/giphy.gif",
    "https://media.giphy.com/media/Y01jP8QeLOox2/giphy.gif",
    "https://media.giphy.com/media/XMcgqIA49OywU/giphy.gif",
    "https://media.giphy.com/media/3o7TKTMbvS3uzlewsU/giphy.gif",
    "https://media.giphy.com/media/m7zZZUSvuQYFoWox74/giphy.gif",
    "https://media.giphy.com/media/xT9IgC5oWqb6F3lvtm/giphy.gif",
    "https://media.giphy.com/media/1SNspiTv9u6yguLgkL/giphy.gif"
]

export default async (req: any, res: any) => {
    res.status(200).send();

    const body = req.body;

    const item = _.sample(possible_gifs)

    const date = moment(new Date(body.date)).format(`MMM DD, YYYY`);
    const updates = _.join(body.updates, `\n`);

    await app.client.chat.postMessage({
        channel: 'perforce-updates',
        text: `A changelist was submitted`,
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${body.username} submitted Changelist ${body.changelist} in Perforce`
                }
            },
            {
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": "Awesome",
                    "emoji": true
                },
                "image_url": item,
                "alt_text": "awesome gif"
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Changelist:*\n${body.changelist}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*When:*\n${date}`
                    }
                ]
            },
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Details",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "plain_text",
                        "text": updates
                    }
                ]
            }
        ]
    });
}