import config from "../config"

export default async (client: any) => {
    const channel_list = await client.conversations.list();

    // @ts-ignore
    await config.sequelize.models.SlackChannel.bulkCreate(channel_list.channels, {
        updateOnDuplicate: [
            `id`,
            `name`,
            `nameNormalized`,
            `isArchived`,
            `creator`
        ]
    });

}