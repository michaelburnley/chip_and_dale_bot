import app from "../config/globals/bolt";
import * as moment from 'moment';
import * as _ from 'lodash';
import sequelize from "../config/globals/sequelize";

export default async (req: any, res: any) => {
    res.status(200).send();

    const body = req.body;

    const message = await sequelize.models.Message.findOne({
        where: {
            platform: `MEDIA`,
            type: body.type
        },
        raw: true,
    });

    if (!message) return;

    // @ts-ignore
    const text = `${body.name} ${message.text} *${body.filename}*.`;
    const updates = `> ${body.updates}`;
    const date = moment(body.date).format(`MMM DD, YYYY`);

    await app.client.chat.postMessage({
        channel: 'media-server-updates',
        text,
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": ":speaker:  Media Server Update  :speaker:"
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "text": `*${date}*  |  Server Change`,
                        "type": "mrkdwn"
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": text,
                },
                "accessory": {
                    "type": "button",
                    "url": body.url,
                    "text": {
                        "type": "plain_text",
                        "text": "View on Server",
                        "emoji": true
                    }
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": updates
                }
            }
        ]
    });
}