import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../services/userService';
import { resSuccess, resError } from '../../../utils/returnRes';
import db from '../../../utils/db';
import { updateUserValidate } from '../../../utils/validate/validateUser';
import { errorParse } from '../../../utils/errorParse';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

const handler = nc();

const secret = process.env.JWT_SECRET as string;

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = await getToken({ req, secret });
        if (!token)
            return resError(
                res,
                'Unauthorized Request',
                {
                    global: 'You are not logged in! Please log in to get access.',
                },
                401
            );

        // checking validate: name, email
        // image can be empty
        type Variables = {
            name?: string;
            email?: string;
            image?: string;
        };
        const variables: Variables = {};
        const { name, email, image = '' } = req.body;

        if (name) variables.name = name;
        if (email) variables.email = email;
        // if (image) variables.image = image
        variables.image = image;

        await updateUserValidate.validate(req.body, { abortEarly: false });

        db.connect();

        // checke change email or not
        if (email !== token.email) {
            // user changed the email (entered another email)
            // check email is exist
            const isExistEmail = await userService.findUserByEmail(email);

            // if email entered is exist in database
            if (isExistEmail) {
                return resError(
                    res,
                    'Bad Request Error',
                    { email: 'This email is already taken' },
                    400
                );
            }
        } else {
            // user not change the email
            delete variables.email;
        }

        const user = await userService.updateUser(
            token._id as string,
            variables
        );

        db.disconnect();

        return resSuccess(res, user);
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
