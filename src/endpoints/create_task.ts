import notion from "../config/globals/notion";
import environment from "../config/environment";
import * as _ from 'lodash';

export default async (req: any, res: any) => {
    res.status(200).send();

    console.log(req)

    const roadmap = environment.notion.database.roadmap as string;

    const response = await notion.databases.retrieve({
        database_id: roadmap,
    });

    const { properties } = response;

    const text = req.body.text;

    const full_properties = {

    }

    _.each(_.keys(properties), key => {
        const obj = {
            type: properties[key].type
        }

        // @ts-ignore
        obj.type = properties[key].type;

        // @ts-ignore
        full_properties[key] = obj;
    })

    const page = await notion.pages.create({
        parent: {
            database_id: roadmap,
        },
        properties,
    } as any)
}