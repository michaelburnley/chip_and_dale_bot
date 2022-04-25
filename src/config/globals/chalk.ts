import * as chalk from 'chalk';
const log = console.log;

const createLog = (text: string, color: string = "blue"): any => {
    // @ts-ignore
    log(chalk[color](text));
}

export default {
    error: (text: string) => createLog(text, "red"),
    info: (text: string) => createLog(text),
    warning: (text: string) => createLog(text, "yellow"),
}