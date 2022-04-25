// @ts-nocheck
declare global {
    var log: any;
}

import chalk from './globals/chalk';
import environment from './environment';


global.log = chalk;
global.env = environment;

export default {
    log: chalk,
    env: environment
}