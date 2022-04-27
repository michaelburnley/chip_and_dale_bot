// @ts-nocheck
declare global {
    var log: any;
}

import chalk from './globals/chalk';
import environment from './environment';
import notion from './globals/notion';
import sequelize from './globals/sequelize';


global.log = chalk;
global.env = environment;
global.notion = notion;
global.sequelize = sequelize;

export default {
    log: chalk,
    env: environment,
    notion,
    sequelize,
}