import axios from 'axios';
import db from './db';

const fetchApi = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        if (!data) throw new Error('Fetch error');
        return data;
    } catch (error) {
        console.log('Fetch error', error);
        console.log('Return error:', error?.response?.data?.errors);
        return error?.response?.data?.errors;
    }
};

export default fetchApi;
