import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import productService from '../../../services/productService';
import { NotFoundError } from '../../../utils/apiErrors';
import { resSuccess } from '../../../utils/returnRes';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('PRODUCT REQ QUERY: ', req.query);
        // handle search by name of product
        const name: string = String(req.query.name) || '';

        // handle filter by category
        const category: string = String(req.query.category) || '';

        // handle filter by variant
        const variant: string = String(req.query.variant) || '';

        // handle filter by size
        const size: string = String(req.query.size) || '';

        // handle pagination
        const page: number = Number(req.query.page) || 1;
        const limit: number = Number(req.query.limit) || 10;
        const skip: number = (page - 1) * limit;

        await db.connect();
        // caculate total number of products
        const total: number = await productService.total(
            name,
            category,
            variant,
            size
        );

        // get products
        const products = await productService.getAllProducts(
            skip,
            limit,
            name,
            category,
            variant,
            size
        );
        if (!products) throw new NotFoundError('Not found any products');
        await db.disconnect();

        return res.status(200).json({
            status: 'success',
            total,
            data: products,
        });
    } catch (error) {
        console.log(error);
    }
});

export default handler;
