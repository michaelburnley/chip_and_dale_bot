// @ts-nocheck
declare global {
    var log: any;
}

import chalk from './globals/chalk';
import environment from './environment';
import notion from './globals/notion';


global.log = chalk;
global.env = environment;
global.notion = notion;

export default {
    log: chalk,
    env: environment,
    notion,
}