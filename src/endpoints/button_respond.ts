import sendMessage from "../helpers/sendMessage";

export default async (req: any, res: any) => {
    res.status(200).send();

    const payload = JSON.parse(req.body.payload);

    const [action] = payload.actions;

    const values = JSON.parse(action.value);

    await sendMessage(values.response_url, {
        text: `<@${payload.user.id}> sent a task: ${values.url}`,
        response_type: `in_channel`,
        unfurl_links: true,
    }, {
        username: `Notion`,
        icon_url: `https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png`,
        as_user: false,
    });
}