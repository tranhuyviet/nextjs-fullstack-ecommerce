import axios from 'axios';
import db from './db';

const fetchApi = async (url: string) => {
    try {
        // await db.connect();
        const { data } = await axios.get(url);
        if (!data) throw new Error('Fetch error');
        // await db.disconnect();
        return data;
    } catch (error) {
        console.log('Fetch error', error);
        console.log('Return error:', error?.response?.data?.errors);
        return error?.response?.data?.errors;
    }
};

export default fetchApi;
