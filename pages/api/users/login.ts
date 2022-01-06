import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../services/userService';
import { NotFoundError, BadRequestError } from '../../../utils/apiErrors';
import { resSuccess, resError } from '../../../utils/returnRes';
import db from '../../../utils/db';
import mongoose from 'mongoose';
import { loginValidate } from '../../../utils/validate/validateUser';
import { errorParse } from '../../../utils/errorParse';
import { setCookie } from '../../../utils/cookies';
import { serialize } from 'cookie';

const handler = nc();

const COOKIE_NAME = 'ecommerceJwt';

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('LOGIN: ', req.body);

        // checking validate: email, password
        await loginValidate.validate(req.body, { abortEarly: false });

        const { email, password } = req.body;

        await db.connect();

        // find user by email
        const user = await userService.findUserByEmail(email);

        // check email and correct password
        // if email or password wrong -> only return errors.global = 'Invalid credentials'
        // not return: 'Email incorrect' or 'Password incorrect'
        if (!user || !user.isValidPassword(password))
            return resError(
                res,
                'Not Found Error',
                {
                    global: 'Invalid credentials. Please make sure you entered the correct email address and password.',
                },
                404
            );

        // check user banned (true)
        if (user.banned)
            return resError(
                res,
                'Not Acceptable',
                { global: 'This user is banned. Please contact to admin' },
                406
            );

        // create cookie
        setCookie(res, user.returnAuthUser().token);

        await db.disconnect();

        // return user with authentication
        return resSuccess(res, user.returnAuthUser());
    } catch (error) {
        console.log(error);
        if (error instanceof Error && error.name == 'ValidationError') {
            const errors = errorParse(error);
            resError(res, 'Bad Request Error - Validate Input', errors, 400);
        } else {
            resError(
                res,
                'Something went wrong',
                { global: 'Something went wrong' },
                500
            );
        }
    }
});

export default handler;
