import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from '../config';
import notion from '../config/globals/notion';

export default () => {
    const app = express()
    const port = process.env.EXPRESS_PORT;

    app.use(bodyParser.json());

    app.get('/', async (req: any, res: any) => {
        // res.send('hello world')
        res.status(200).send();
        const response = await notion.pages.retrieve({ page_id: config.env.notion.pages.roadmap as string });
        console.log(response);
    })

    app.listen(port, () => {
        config.log.info(`⚡️ Endpoints up on port ${port}!`);
    })
}
