import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from '../config';
import create_task from './create_task';
import search_tasks from './search_tasks';
import button_respond from './button_respond';
import send_changelist from './send_changelist';
import send_media_update from './send_media_update';

export default () => {
    const app = express()
    const port = process.env.EXPRESS_PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/create_task', create_task)
    app.post('/search_notion', search_tasks);
    app.post('/button_respond', button_respond);
    app.post('/send_changelist', send_changelist);
    app.post(`/send_media_update`, send_media_update);

    app.listen(port, () => {
        config.log.info(`⚡️ Endpoints up on port ${port}!`);
    })
}
