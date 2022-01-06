import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resSuccess, resError } from '../../../utils/returnRes';
import { setCookie } from '../../../utils/cookies';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('LOGOUT: ', req.body);

        // update cookie = ''
        setCookie(res, '');

        // return user with authentication
        return resSuccess(res);
    } catch (error) {
        resError(
            res,
            'Something went wrong',
            { global: 'Something went wrong' },
            500
        );
    }
});

export default handler;
