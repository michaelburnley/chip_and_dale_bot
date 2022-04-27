import config from "../config"

export default async (client: any) => {
    // console.log(`test`);
    const channel_list = await client.conversations.list();

    // console.log(config.sequelize);
    // @ts-ignore
    await config.sequelize.models.SlackChannel.bulkCreate(channel_list.channels, {
        updateOnDuplicate: [
            `id`,
            `name`,
            `name_normalized`,
            `is_archived`,
            `creator`
        ]
    });

}