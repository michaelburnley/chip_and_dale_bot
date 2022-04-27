import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from '../config';
import notion from '../config/globals/notion';
import create_task from './create_task';

export default () => {
    const app = express()
    const port = process.env.EXPRESS_PORT;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', async (req: any, res: any) => {
        // res.send('hello world')
        res.status(200).send();
        // console.log(config.env.notion.pages.roadmap)
        // const response = await notion.pages.retrieve({ page_id: config.env.notion.pages.roadmap as string });
        // console.log(response);

        // @ts-ignore
        // const response = await notion.databases.retrieve({ database_id: config.env.notion.database.roadmap })

        const response = await notion.search({
            // query: 'databases',
            filter: {
                value: 'database',
                property: 'object'
            },
            sort: {
                direction: 'ascending',
                timestamp: 'last_edited_time',
            },
        });

        console.log(JSON.stringify(response))
    })

    app.post('/create_task', create_task)


    app.listen(port, () => {
        config.log.info(`⚡️ Endpoints up on port ${port}!`);
    })
}
