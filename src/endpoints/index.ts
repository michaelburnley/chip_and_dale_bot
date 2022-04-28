import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from '../config';
import create_task from './create_task';
import search_tasks from './search_tasks';

export default () => {
    const app = express()
    const port = process.env.EXPRESS_PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/create_task', create_task)
    app.post('/search_notion', search_tasks);

    app.listen(port, () => {
        config.log.info(`⚡️ Endpoints up on port ${port}!`);
    })
}
