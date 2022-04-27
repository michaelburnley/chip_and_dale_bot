// @ts-nocheck

import * as _ from 'lodash';
import config from "../config";
const {
    sequelize,
    notion,
} = config;

export default async () => {

    const notion_dbs = await notion.search({
        filter: {
            value: 'database',
            property: 'object'
        },
        sort: {
            direction: 'ascending',
            timestamp: 'last_edited_time',
        },
    });

    const payloads = _.map(notion_dbs.results, db => {

        const title = _.first(db.title).text.content;
        const parent = db.parent.page_id;
        return {
            id: db.id,
            title,
            parent,
            archived: db.archived,
            url: db.url,
        }
    })

    try {
        await sequelize.models.NotionDB.bulkCreate(payloads, {
            updateOnDuplicate: [
                `id`,
                `title`,
                `parent`,
                `url`,
                `archived`,
            ],
        });
        config.log.info(`Finished syncing Notion DBs`);
    } catch (err) {
        config.log.error(`Failed to sync Notion DBs: ${err}`);
    }
}