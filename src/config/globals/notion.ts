import { Client } from '@notionhq/client';
import environment from '../environment';

// Initializing a client
export default new Client({
    auth: environment.notion.token,
})