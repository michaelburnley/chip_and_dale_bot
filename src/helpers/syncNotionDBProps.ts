import * as _ from 'lodash';
import config from "../config";
const {
    sequelize,
    notion,
} = config;

export default async () => {
    const notion_dbs = await sequelize.models.NotionDB.findAll({ raw: true });

    const payloads = [];

    for (const db of notion_dbs) {
        const full_db = await notion.databases.retrieve({
            // @ts-ignore
            database_id: db.id,
        });

        const {
            properties
        } = full_db;

        const keys = _.keys(properties);

        const arr = _.map(keys, key => {

            const prop_keys = _.keys(properties[key]);

            const custom_section_key = _.last(prop_keys) as string;
            // @ts-ignore
            const prop = properties[key][custom_section_key];

            return {
                id: properties[key].id,
                name: properties[key].name,
                type: properties[key].type,
                prop: JSON.stringify(prop),
                // @ts-ignore
                notion_db_id: db.id,
            }
        });

        payloads.push(...arr);
    }

    try {
        await sequelize.models.NotionDBProps.bulkCreate(payloads, {
            updateOnDuplicate: [
                `id`,
                `name`,
                `type`,
                `prop`,
                `notion_db_id`,
            ],
        });
        config.log.info(`📚 Finished syncing Notion DB Properties`);
    } catch (err) {
        config.log.error(`Failed to sync Notion DB Properties: ${err}`);
    }
}