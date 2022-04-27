import * as chalk from 'chalk';
const log = console.log;

const createLog = (text: string, color: string = "blue"): any => {
    // @ts-ignore
    const chalked = chalk[color] as any;
    log(chalked(text));
}

export default {
    success: (text: string) => createLog(text, "green"),
    error: (text: string) => createLog(text, "red"),
    info: (text: string) => createLog(text),
    warning: (text: string) => createLog(text, "yellow"),
}