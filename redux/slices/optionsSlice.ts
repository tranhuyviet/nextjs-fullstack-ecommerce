// category, variant, size store
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
    _id?: string;
    name: string;
    global?: string;
}

export interface IVariant {
    _id?: string;
    name: string;
    colorHex: string;
    global?: string;
}

export interface ISize {
    _id?: string;
    name: string;
    global?: string;
}

export interface IProductFilter {
    page: number;
    limit: number;
    name?: string;
    category?: string;
    variant?: string;
    size?: string;
}

interface IOptions {
    categories: ICategory[];
    variants: IVariant[];
    sizes: ISize[];
}

const initialState: IOptions = {
    categories: [],
    variants: [],
    sizes: [],
};

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        updateCategory: (state, action) => {
            const category = state.categories.find(
                (category) => category._id === action.payload._id
            );
            if (category) category.name = action.payload.name;
        },
        setVariants: (state, action) => {
            state.variants = action.payload;
        },
        updateVariant: (state, action) => {
            const variant = state.variants.find(
                (variant) => variant._id === action.payload._id
            );
            if (variant) {
                variant.name = action.payload.name;
                variant.colorHex = action.payload.colorHex;
            }
        },
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
        updateSize: (state, action) => {
            const size = state.sizes.find(
                (size) => size._id === action.payload._id
            );
            if (size) size.name = action.payload.name;
        },
    },
});

export const {
    setCategories,
    updateCategory,
    setVariants,
    updateVariant,
    setSizes,
    updateSize,
} = optionsSlice.actions;
export default optionsSlice.reducer;
