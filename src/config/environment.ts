export default {
    slack: {
        signing_secret: process.env.SLACK_SIGNING_SECRET,
        bot_token: process.env.SLACK_BOT_TOKEN,
        app_id: process.env.SLACK_APP_ID,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
    },
    notion: {
        client_id: process.env.NOTION_CLIENT_ID,
        redirect_uri: process.env.NOTION_REDIRECT_URL,
        response_type: process.env.NOTION_RESPONSE_TYPE,
        owner: process.env.NOTION_OWNER,
        token: process.env.NOTION_TOKEN,
        pages: {
            roadmap: process.env.NOTION_ROADMAP_ID,
        }
    },
    db: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    },
    port: process.env.SLACK_PORT,
}