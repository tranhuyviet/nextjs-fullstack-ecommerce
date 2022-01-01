import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import variantService from '../../../services/variantService';
import { NotFoundError } from '../../../utils/apiErrors';
import { resSuccess } from '../../../utils/returnRes';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db.connect();
        const variants = await variantService.getAllVariants();
        if (!variants) throw new NotFoundError('Not found any variants');
        await db.disconnect();

        return resSuccess(res, variants);
    } catch (error) {
        console.log(error);
    }
});

export default handler;
