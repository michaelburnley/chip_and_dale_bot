// @ts-nocheck

import chalk from '../config/globals/chalk';
import notion from '../config/globals/notion';
import sequelize from '../config/globals/sequelize';
import environment from '../config/environment';
import axios from 'axios';
import * as _ from 'lodash';
import * as moment from 'moment';

// const type_mapping = {
//     issue: `Bug 🐞`,
//     epic: `Epic ⛰️`,
//     task: `Task 🔨`
// }

const description_regex = /\[(.*?)\]/;
const type_regex = /\:document|discussion|task\:/;

export default async (req: any, res: any) => {
    res.status(200).send();

    const body = req.body;
    let message;

    const [project, ...rest] = _.split(req.body.text, ' ');
    const query_text = _.join(rest, ' ');

    const has_type = query_text.match(type_regex);

    if (!has_type) return;

    let [type] = has_type;
    type = _.replace(type, ':', '');

    const project_mapping = await sequelize.models.ProjectMapping.findOne({
        where: {
            project: _.lowerCase(project),
            type,
        },
        raw: true,
    });

    if (!project_mapping) {
        await axios.post(req.body.response_url, {
            text: `Please prefix your search query with a valid project name and try again: [nightshift, youtube]`,
            response_type: `ephemeral`
        })
        return;
    }


    const clean_query_text = _.replace(query_text, `:${type}:`, '');

    // /find nightshift :task; search_text

    const all_items = await notion.databases.query({
        database_id: project_mapping.notion_id,
        filter: {
            or: [
                {
                    property: 'Projects',
                    title: {
                        contains: clean_query_text,
                    }
                },
            ],
        },
    });
    const items = [];

    _.each(all_items.results, item => {
        const title = item.properties.Projects.title[0].text.content;
        const id = item.id;
        const type = item.properties.Type?.select?.name || `Not Set`;
        const status = item.properties.Status?.select?.name;
        const url = item.url;
        const created_time = moment(item.created_time).format(`MM/DD/YY`);


        const divider = {
            "type": "divider"
        }
        const section =
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*<${url}|${title}>*\nType: ${type}\nStatus: ${status}\nCreated: ${created_time}`
            },
            // "accessory": {
            //     "type": "button",
            //     "text": {
            //         "type": "plain_text",
            //         "text": `Select`,
            //     },
            //     "value": url,
            //     "action_id": "button-action"
            // }
        }
        const context =
        {
            "type": "context",
            "elements": [
                {
                    "type": "image",
                    "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                    "alt_text": "Location Pin Icon"
                },
                {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Location: Central Business District"
                }
            ]
        };

        items.push(divider, section);

    })

    const text = `Search for "${clean_query_text}"`;

    const modal = await axios.post(`https://slack.com/api/views.open`,
        {
            "trigger_id": body.trigger_id,
            "view": {
                "type": `modal`,
                "title": {
                    "type": `plain_text`,
                    "text": _.truncate(text, { length: 25 })
                },
                "blocks": [
                    {
                        "type": "section",
                        "block_id": "overview-section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `Found ${all_items.results.length} ${type}s`
                        },
                        "accessory": {
                            "type": "overflow",
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Option One"
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Option Two"
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Option Three"
                                    },
                                    "value": "value-2"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Option Four"
                                    },
                                    "value": "value-3"
                                }
                            ]
                        },
                    },
                    ...items,
                ]
            }
        },
        {
            headers: {
                'Content-type': `application/json; chart=utf-8`,
                'Authorization': `Bearer ${environment.slack.bot_token}`
            }
        }
    );

    // console.log(JSON.stringify(all_items.results));
    // console.log(JSON.stringify(modal.data));
    // try {

    // } catch (err) {
    //     chalk.error(`Unable to search tasks: ${err}`);
    //     message = `Notion search failed for ${body.text}. Try again later.`
    // }

    // await axios.post(body.response_url, {
    //     text: message,
    //     response_type: `ephemeral`
    // })
}