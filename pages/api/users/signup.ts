import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../services/userService';
import { resSuccess, resError } from '../../../utils/returnRes';
import db from '../../../utils/db';
import { signupValidate } from '../../../utils/validate/validateUser';
import { errorParse } from '../../../utils/errorParse';
import { setCookie } from '../../../utils/cookies';
import User, { UserDocument } from '../../../models/userModel';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('SIGNUP: ', req.body);

        // checking validate: email, password
        await signupValidate.validate(req.body, { abortEarly: false });

        const { name, email, password } = req.body;

        await db.connect();

        // checking email is exist -> throw error, if not -> create new user
        const isUserExist = await userService.findUserByEmail(email);
        if (isUserExist) {
            return resError(
                res,
                'Bad Request Error',
                {
                    global: 'This email is already taken. Please enter another email address.',
                },
                400
            );
        }

        // create new user
        const user: UserDocument = new User({ name, email });

        // hash password
        user.hashPassword(password);

        // save user
        await userService.save(user);

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
