// @ts-nocheck

import * as _ from 'lodash';
import axios from 'axios';

import notion from "../config/globals/notion";
import sequelize from "../config/globals/sequelize";
import chalk from "../config/globals/chalk";

const description_regex = /\[(.*?)\]/;
const type_regex = /\:epic|issue|task\:/;

const type_mapping = {
    issue: `Bug 🐞`,
    epic: `Epic ⛰️`,
    task: `Task 🔨`
}

export default async (req: any, res: any) => {
    res.status(200).send();

    const [project, ...rest] = _.split(req.body.text, ' ');

    const project_mapping = await sequelize.models.ProjectMapping.findOne({
        where: {
            project: _.lowerCase(project),
            type: `task`
        },
        raw: true,
    });

    if (!project_mapping) {
        await axios.post(req.body.response_url, {
            text: `Please prefix your task name with a valid project name and try again: [nightshift, youtube]`,
            response_type: `ephemeral`
        })

        return;
    }

    const task_name = _.join(rest, ' ');

    const has_description = task_name.match(description_regex);

    if (!has_description) return;

    const [found_text, description] = has_description;

    const has_type = task_name.match(type_regex);

    if (!has_type) return;

    const [type_raw] = has_type;
    const type = _.replace(type_raw, ':', '');

    const title = _.replace(_.replace(task_name, `[${description}]`, ''), `:${type}:`, '');

    const properties = {
        Status: {
            select: {
                name: "Imported"
            }
        },
        Projects: {
            title: [
                {
                    text: {
                        content: title
                    }
                }
            ]
        },
        Type: {
            select: {
                name: type_mapping[type],
            }
        }
    }

    const children = [
        {
            object: 'block',
            type: 'heading_1',
            heading_1: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: 'Overview',
                        },
                    },
                ],
            },
        },
        {
            object: 'block',
            type: 'paragraph',
            paragraph: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: `${description}`,
                        },
                    }
                ]
            },
        }

    ];

    try {
        const created = await notion.pages.create({
            parent: {
                database_id: project_mapping.notion_id,
            },
            properties,
            children,
        } as any)
        chalk.success(`Successfully imported "${title}" to ${project} tasks.`);

        await axios.post(req.body.response_url, {
            text: `Created task "${title}" for ${project}: ${created.url}`,
            response_type: `ephemeral`
        });
    } catch (err) {
        chalk.error(`Failed to import "${title}" to ${project}: ${err}`);

        await axios.post(req.body.response_url, {
            text: `Failed to create task "${title}" for ${project}. Try again later.`,
            response_type: `ephemeral`
        })
    }

}