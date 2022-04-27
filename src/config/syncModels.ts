import sequelize from "./globals/sequelize";
import chalk from "./globals/chalk";
import models from './models';
import { ModelAttributes, ModelOptions } from 'sequelize/types'

export default () => {
    const tables: string[] = [];

    for (const model of models) {
        const {
            options,
            definition,
            associations
        } = model;
        sequelize.define(options.modelName, definition as ModelAttributes, options as ModelOptions);
        associations();
        tables.push(model.options.modelName)
    }

    sequelize.sync();
    chalk.info(`Synced ${tables.length} tables: ${tables}`)
}