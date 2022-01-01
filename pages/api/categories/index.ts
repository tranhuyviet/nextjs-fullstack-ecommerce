import nc from 'next-connect';
import Category from '../../../models/categoryModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import categoryService from '../../../services/categoryService';
import { NotFoundError } from '../../../utils/apiErrors';
import { resSuccess } from '../../../utils/returnRes';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await db.connect();
        const categories = await categoryService.getAllCategories();
        if (!categories) throw new NotFoundError('Not found any categories');
        await db.disconnect();
        return resSuccess(res, categories);
        // res.status(200).json({ name: 'John Doe' });
    } catch (error) {
        console.log(error);
    }
});

export default handler;
