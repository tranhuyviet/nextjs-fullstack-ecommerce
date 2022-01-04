import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import productService from '../../../services/productService';
import { NotFoundError, BadRequestError } from '../../../utils/apiErrors';
import { resSuccess } from '../../../utils/returnRes';
import db from '../../../utils/db';
import mongoose from 'mongoose';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('PRODUCT BY ID REQ QUERY: ', req.query);

        const _id = req.query._id;
        // checking isValid id
        const isCorrectId = mongoose.Types.ObjectId.isValid(_id as string);
        if (!isCorrectId) throw new BadRequestError('ID proviced invalid');

        await db.connect();
        // find the product
        const product = await productService.findById(_id as string);
        if (!product)
            throw new BadRequestError('Product not found, ID proviced invalid');

        // productg suggession
        const productsSuggess = await productService.suggession(
            product.category,
            product._id
        );

        await db.disconnect();

        return resSuccess(res, { product, productsSuggess });
    } catch (error) {
        console.log(error);
    }
});

export default handler;
