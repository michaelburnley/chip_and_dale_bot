import axios from 'axios';
import * as _ from 'lodash';

export default async (url: string, message: any, user: any = {}) => {

    const payload = {
        ...message,
        ...user,
    };

    await axios.post(url, payload);
}