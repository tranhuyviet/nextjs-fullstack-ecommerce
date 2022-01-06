import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (res: NextApiResponse, value: unknown) => {
    const stringValue =
        typeof value === 'object'
            ? 'j:' + JSON.stringify(value)
            : String(value);

    res.setHeader(
        'Set-Cookie',
        serialize('ecommerceJwt', stringValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
        })
    );
};
