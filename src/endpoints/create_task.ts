// @ts-nocheck

import * as _ from 'lodash';
import axios from 'axios';

import notion from "../config/globals/notion";
import sequelize from "../config/globals/sequelize";
import chalk from "../config/globals/chalk";

export default async (req: any, res: any) => {
    res.status(200).send();

    const [project, ...rest] = _.split(req.body.text, ' ');
    const task_name = _.join(rest, ' ');

    const project_mapping = await sequelize.models.ProjectMapping.findOne({
        where: {
            project: _.lowerCase(project),
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
                        content: task_name
                    }
                }
            ]
        }
    }

    try {
        const created = await notion.pages.create({
            parent: {
                database_id: project_mapping.notion_id,
            },
            properties,
        } as any)
        chalk.success(`Successfully imported "${task_name}" to ${project} tasks.`);

        await axios.post(req.body.response_url, {
            text: `Created task "${task_name}" for ${project}: ${created.url}`,
            response_type: `ephemeral`
        });
    } catch (err) {
        chalk.error(`Failed to import "${task_name}" to ${project}: ${err}`);

        await axios.post(req.body.response_url, {
            text: `Failed to create task "${task_name}" for ${project}. Try again later.`,
            response_type: `ephemeral`
        })
    }

}