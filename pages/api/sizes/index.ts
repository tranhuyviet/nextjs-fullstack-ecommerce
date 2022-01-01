import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import sizeService from '../../../services/sizeService';
import { NotFoundError } from '../../../utils/apiErrors';
import { resSuccess } from '../../../utils/returnRes';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db.connect();
        const sizes = await sizeService.getAllSizes();
        if (!sizes) throw new NotFoundError('Not found any sizes');
        await db.disconnect();

        return resSuccess(res, sizes);
    } catch (error) {
        console.log(error);
    }
});

export default handler;
