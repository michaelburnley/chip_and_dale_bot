import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from '../config';
import create_task from './create_task';

export default () => {
    const app = express()
    const port = process.env.EXPRESS_PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.post('/create_task', create_task)

    app.listen(port, () => {
        config.log.info(`⚡️ Endpoints up on port ${port}!`);
    })
}
