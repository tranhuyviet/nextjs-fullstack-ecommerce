import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IVariant, ISize } from './optionsSlice';

export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    category: ICategory;
    variants: IVariant[];
    sizes: ISize[];
    user: string;
    createdAt?: string;
    updateAt?: string;
    global?: string;
}

const initialState = {
    products: <IProduct[]>[],
    selectedProduct: <IProduct>{},
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products = [...state.products, action.payload];
        },
        updateProduct: (state, action: PayloadAction<IProduct>) => {
            const product: IProduct = state.products.find(
                (product) => product._id === action.payload._id
            )!;
            product.name = action.payload.name;
            product.description = action.payload.description;
            product.price = action.payload.price;
            product.discount = action.payload.discount;
            product.images = action.payload.images;
            product.category = action.payload.category;
            product.variants = action.payload.variants;
            product.sizes = action.payload.sizes;
            product.user = action.payload.user;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = state.products.find(
                (product) => product._id === action.payload
            )!;
        },
    },
});

export const { setProducts, addProduct, updateProduct, setSelectedProduct } =
    productSlice.actions;
export default productSlice.reducer;
