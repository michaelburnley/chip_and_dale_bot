import { App } from '@slack/bolt';
import environment from '../environment';

const app = new App({
    signingSecret: environment.slack.signing_secret,
    token: environment.slack.bot_token,
});

export default app;